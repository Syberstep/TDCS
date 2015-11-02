package com.springapp.mvc.controller.exam;

import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.domain.exam.*;
import com.springapp.mvc.pojo.Position;
import com.springapp.mvc.pojo.User;
import com.springapp.mvc.pojo.exam.*;
import com.springapp.mvc.util.DateUtil;
import com.springapp.mvc.util.HibernateUtil;
import flexjson.JSONSerializer;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.math.MathContext;
import java.util.*;

/**
 * Created by Phuthikorn_T on 17-Sep-15.
 */
@Controller
@RequestMapping(value = "/TDCS")
public class DoExamController {
    @Autowired
    QueryUserDomain queryUserDomain;

    @Autowired
    QuerySubCategoryDomain querySubCategoryDomain;

    @Autowired
    QueryCategoryDomain queryCategoryDomain;

    @Autowired
    QueryPaperDomain queryPaperDomain;

    @Autowired
    QueryChoiceDomain queryChoiceDomain;

    @Autowired
    QueryQuestionDomain queryQuestionDomain;

    @Autowired
    QueryQuestionTypeDomain queryQuestionTypeDomain;

    @Autowired
    QueryDifficultyDomain queryDifficultyDomain;

    @Autowired
    QueryStatusDomain queryStatusDomain;

    @Autowired
    QueryBooDomain queryBooDomain;

    @Autowired
    QueryExamRecordDomain queryExamRecordDomain;

    @Autowired
    QueryExamAnswerDomain queryExamAnswerDomain;

    @Autowired
    QueryExamResultDomain queryExamResultDomain;

    @Autowired
    QueryPaperQuestionDomain queryPaperQuestionDomain;


    @RequestMapping(method = RequestMethod.GET, value = "/exam/mainPageStudent")
    public String mainPageStudent(ModelMap modelMap,HttpServletRequest request,HttpServletResponse response){

        User user = queryUserDomain.getCurrentUser(request);
        modelMap.addAttribute("openPaperList",queryPaperDomain.getOpenedPaperForUser(user));
        modelMap.addAttribute("donePaperList",queryPaperDomain.getDonePaperForUser(user));


        return "mainPageStudent";
    }


    @RequestMapping(method = RequestMethod.GET, value = "/exam/doExam")
    public String doExam(ModelMap modelMap, Model model, HttpServletRequest request, HttpServletResponse response,
                         @RequestParam(value = "paperId") Integer paperId) {

        ExamPaper examPaper = queryPaperDomain.getPaperById(paperId);
        modelMap.addAttribute("paper", examPaper);
        modelMap.addAttribute("user", queryUserDomain.getCurrentUser(request));

        return "doExam";
    }

    @RequestMapping(method = RequestMethod.POST, value = "/exam/submitExam")
    @ResponseBody
    public ResponseEntity<String> submitExam(HttpServletRequest request, HttpServletResponse response, ModelMap model
            , @RequestParam(value = "paperId") String paperId
            , @RequestParam(value = "answerRecords") JSONArray answerRecords
            , @RequestParam(value = "timeTaken") Integer timeTaken
//                             , @RequestBody List<AnswerRecord> answerRecords
    ) throws Exception {

        ExamPaper paper = queryPaperDomain.getPaperById(Integer.parseInt(paperId));
        User user = queryUserDomain.getCurrentUser(request);
        ExamRecord examRecord = new ExamRecord();
        examRecord.setUser(user);
        examRecord.setPaper(paper);
        examRecord.setTimeTaken(timeTaken);
        examRecord.setExamDate(DateUtil.getCurrentDateWithRemovedTime());
        boolean haveSubjective = false;
        MathContext mc = new MathContext(2);
        QuestionType subjective = queryQuestionTypeDomain.getSubjective();

        ExamRecord preTestRecord = queryExamRecordDomain.getPreTestRecord(examRecord);
        if (preTestRecord != null){
            examRecord.setPreTestRecord(preTestRecord);
        }

        Float objectiveScore = 0f;
        Choice currentChoice = null;
        Question currentQuestion = null;
        try {
            HibernateUtil.beginTransaction();

            queryExamRecordDomain.saveExamRecord(examRecord);
            //Save ExamRecord

            for (int i = 0; i < answerRecords.length(); i++) {
                ExamAnswerRecord examAnswerRecord = new ExamAnswerRecord();
                examAnswerRecord.setExamRecord(examRecord);
                currentQuestion = queryQuestionDomain.getQuestionById(answerRecords.getJSONObject(i).getInt("questionId"));
                examAnswerRecord.setQuestion(currentQuestion);

                if(currentQuestion.getQuestionType() == subjective){
                    haveSubjective = true;
                }

                if (answerRecords.getJSONObject(i).optInt("answerObjective") != 0) {
                    currentChoice = queryChoiceDomain.getChoiceById(answerRecords.getJSONObject(i).getInt("answerObjective"));
                    examAnswerRecord.setAnswerObjective(currentChoice);

                    if (currentChoice.getCorrection().getBoolean()) {

                        PaperQuestion pq = queryPaperQuestionDomain.getPaperQuestion(paper, currentQuestion);
                        Float score = pq.getScore();
                        objectiveScore += score;
                    }
                } else {
                    try {
                        examAnswerRecord.setAnswerSubjective(
                                answerRecords.getJSONObject(i).getString("answerSubjective"));
                    }catch (Exception e){
                        //Do nothing
                    }
                }
                queryExamAnswerDomain.saveExamAnswer(examAnswerRecord);
            }
            //Save ExamResult
            ExamResult examResult = new ExamResult();
            examResult.setExamRecord(examRecord);
            examResult.setObjectiveScore(objectiveScore);

            if(!haveSubjective){
                examResult.setMarkedDate(DateUtil.getCurrentDateWithRemovedTime());
                examResult.setStatus(queryStatusDomain.getMarkConfirmedStatus());
                examResult.setSubjectiveScore(0f);
                examResult.setComment("");
            }else {
                examResult.setStatus(queryStatusDomain.getPendingStatus());
            }

            queryExamResultDomain.saveExamResult(examResult);

            HibernateUtil.commitTransaction();
            HibernateUtil.closeSession();

        } catch (Exception e) {
            e.printStackTrace();
            HibernateUtil.rollbackTransaction();
            throw e;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        String json = new JSONSerializer().serialize("hello");

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/getExamBody")
    @ResponseBody
    public ResponseEntity<String> getExamBody(@RequestParam(value = "paperId", required = true) Integer paperId) {

        List<Question> questionList = queryQuestionDomain.getQuestionListByPaper(queryPaperDomain.getPaperById(paperId));
        for (Question q : questionList) {
            Collections.shuffle(q.getChoices());
        }
        Collections.shuffle(questionList);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        String json = new JSONSerializer().exclude("*.class").include("choices").serialize(questionList);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }
}
