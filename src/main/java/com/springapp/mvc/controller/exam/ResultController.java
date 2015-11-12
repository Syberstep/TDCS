package com.springapp.mvc.controller.exam;

import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.domain.exam.QueryExamRecordDomain;
import com.springapp.mvc.domain.exam.QueryExamResultDomain;
import com.springapp.mvc.domain.exam.QueryPaperQuestionDomain;
import com.springapp.mvc.pojo.exam.*;
import flexjson.JSONSerializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.logging.Logger;

//import org.springframework.transaction.annotation.Transactional;

/**
 * Created by PTang_000 on 14-Oct-15.
 */
@Controller
@RequestMapping("/TDCS")
public class ResultController {
    private static final Logger log = Logger.getLogger(ResultController.class.getName());
    @Autowired
    QueryUserDomain queryUserDomain;

    @Autowired
    QueryExamRecordDomain queryExamRecordDomain;

    @Autowired
    QueryExamResultDomain queryExamResultDomain;

    @Autowired
    QueryPaperQuestionDomain queryPaperQuestionDomain;

//    @Transactional
    @RequestMapping(method = RequestMethod.GET, value = "/exam/checkScore")
    public String checkScore(HttpServletRequest request,ModelMap modelMap){

        List<ExamResult> examResults = queryExamResultDomain.getUserResult(queryUserDomain.getCurrentUser(request));

        modelMap.addAttribute("examResults",examResults);

        return "checkScore";
    }

    @RequestMapping(method= RequestMethod.POST, value="/exam/checkScore/getResultDetail")
    @ResponseBody
    public ResponseEntity<String> getResultDetail(@RequestParam(value = "resultId",required = true)Integer resultId){

        ExamResult examResult = queryExamResultDomain.getExamResultById(resultId);
//        if(examResult.getStatus().getId() != 7){
//            examResult = null;
//        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        String json = new JSONSerializer().exclude("*.class").serialize(examResult);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);

    }


//
//    @RequestMapping(method = RequestMethod.POST, value = "/exam/addQuestion")
//    @ResponseBody
//    public ResponseEntity<String> getUserResult(ModelMap model,HttpServletResponse response,HttpServletRequest request){
//
//        List<ExamResult> examResults = queryExamResultDomain.getUserResult(queryUserDomain.getCurrentUser(request));
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Type", "application/json;charset=UTF-8");
//        String json = new JSONSerializer().exclude("*.class").serialize(examResults);
//
//        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
//    }
@RequestMapping(method= RequestMethod.POST, value="/exam/checkScore/getResultDetail2")
@ResponseBody
public ResponseEntity<String> getResultDetail2(@RequestParam(value = "resultId",required = true)Integer resultId){

    ExamResult examResult = queryExamResultDomain.getExamResultById(resultId);
    Set<SubCategory> subCatSet = new HashSet<SubCategory>();
    Map<SubCategory,Float> resultObjectScoreSubcatMap = new HashMap<SubCategory, Float>();
    Map<SubCategory,Float> maxScoreSubCatObjectiveMap = new HashMap<SubCategory, Float>();
    Map<SubCategory,Float> maxScoreSubCatSubjectiveMap = new HashMap<SubCategory, Float>();
    Map<SubCategory,Float> resultSubjectScoreSubcatMap = new HashMap<SubCategory, Float>();
    List<CheckScore> checkScoreList = new ArrayList<CheckScore>();

    Set<PaperQuestion> pqList = examResult.getExamRecord().getPaper().getQuestions();
    List<ExamAnswerRecord> examAnswerRecords = examResult.getExamRecord().getExamAnswerRecords();

    for(PaperQuestion pq : pqList){
        subCatSet.add(pq.getQuestion().getSubCategory());
    }


//-------------------------------------------------------------------------------------------------------------------
    Float maxScoreObjective = 0f;
    Float maxScoreSubjective = 0f;
    Float resultObjectScore = 0f;
    Float resultSubjectScore = 0f;
    for(SubCategory sc : subCatSet){
        CheckScore checkScore = new CheckScore();
        for(ExamAnswerRecord ear : examAnswerRecords){
            PaperQuestion pq = queryPaperQuestionDomain.getPaperQuestion(examResult.getExamRecord().getPaper(), ear.getQuestion());
            float objective = 0f;
            float subjective = 0f;
            float maxScoreObject = 0f;
            float maxScoreSubject = 0f;
            if(ear.getQuestion().getSubCategory() == sc){
                if(ear.getAnswerObjective() != null){
                    if(ear.getAnswerObjective().getCorrection()){
                        objective = pq.getScore();
                        resultObjectScore += objective;
                        resultObjectScoreSubcatMap.put(sc, resultObjectScore);
                    }
                    maxScoreObject = pq.getScore();
                    maxScoreObjective += maxScoreObject;
                    maxScoreSubCatObjectiveMap.put(sc,maxScoreObjective);
                }else{
                    if(ear.getMarkingRecord() != null){
                        if(ear.getMarkingRecord().getMarkingScore() != 0){
                            subjective = ear.getMarkingRecord().getMarkingScore();
                            resultSubjectScore = subjective;
                            resultSubjectScoreSubcatMap.put(sc,resultSubjectScore);
                        }
                        maxScoreSubject = pq.getScore();
                        maxScoreSubjective += maxScoreSubject;
                    }
                    maxScoreSubCatSubjectiveMap.put(sc,maxScoreSubjective);
                }
//                resultSubjectScoreSubcatMap.put(sc,resultSubjectScore);
//                resultObjectScoreSubcatMap.put(sc, resultObjectScore);
//                maxScoreSubCatObjectiveMap.put(sc,maxScoreObjective);
//                maxScoreSubCatSubjectiveMap.put(sc,maxScoreSubjective);
            }

        }


        checkScore.setCategoryName(sc.getCategory().getName());
        checkScore.setSubCategoryName(sc.getName());
        for(SubCategory key : resultObjectScoreSubcatMap.keySet()){
            if( key.getName() == sc.getName()){
                Float value = resultObjectScoreSubcatMap.get(key);
                checkScore.setSubCategoryResultObjectScore(value);
            }
        }
        for(SubCategory key : resultSubjectScoreSubcatMap.keySet()){
            if( key.getName() == sc.getName()){
                Float value = resultSubjectScoreSubcatMap.get(key);
                checkScore.setSubCategoryResultSubjectScore(value);
            }
        }
        for(SubCategory key : maxScoreSubCatObjectiveMap.keySet()){
            if( key.getName() == sc.getName()){
                Float value = maxScoreSubCatObjectiveMap.get(key);
                checkScore.setSubCategoryMaxScoreObjective(value);
            }
        }for(SubCategory key : maxScoreSubCatSubjectiveMap.keySet()){
            if( key.getName() == sc.getName()){
                Float value = maxScoreSubCatSubjectiveMap.get(key);
                checkScore.setSubCategoryMaxScoreSubjective(value);
            }
        }
//        checkScore.setObjectiveScore(examResult.getObjectiveScore().doubleValue());
//        checkScore.setSubjectiveScore(examResult.getSubjectiveScore().doubleValue());
        checkScoreList.add(checkScore);
    }
//-------------------------------------------------------------------------------------------------------------------
    HttpHeaders headers = new HttpHeaders();
    headers.add("Content-Type", "application/json;charset=UTF-8");
    String json = new JSONSerializer().include("examRecord.examAnswerRecords.answerObjective.question").exclude("*.class")
            .exclude("examRecord.paper").exclude("*.status").serialize(checkScoreList);
//String json = new JSONSerializer().include("examRecord.examAnswerRecords.question.subCategory").include("examRecord.examAnswerRecords").exclude("*.class")
//            .exclude("examRecord.paper").exclude("*.status").serialize(examResult);

    return new ResponseEntity<String>(json, headers, HttpStatus.OK);

}



}