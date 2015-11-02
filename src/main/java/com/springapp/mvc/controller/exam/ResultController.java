package com.springapp.mvc.controller.exam;

import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.domain.exam.QueryExamRecordDomain;
import com.springapp.mvc.domain.exam.QueryExamResultDomain;
import com.springapp.mvc.pojo.exam.ExamResult;
import flexjson.JSONSerializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
//import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by PTang_000 on 14-Oct-15.
 */
@Controller
@RequestMapping("/TDCS")
public class ResultController {
    @Autowired
    QueryUserDomain queryUserDomain;

    @Autowired
    QueryExamRecordDomain queryExamRecordDomain;

    @Autowired
    QueryExamResultDomain queryExamResultDomain;


//    @Transactional
    @RequestMapping(method = RequestMethod.GET, value = "/exam/checkScore")
    public String checkScore(HttpServletRequest request,ModelMap modelMap){

        List<ExamResult> examResults = queryExamResultDomain.getUserResult(queryUserDomain.getCurrentUser(request));

        modelMap.addAttribute("examResults",examResults);

        return "checkScore";
    }

    @RequestMapping(method=RequestMethod.POST, value="/exam/checkScore/getResultDetail")
    @ResponseBody
    public ResponseEntity<String> getResultDetail(@RequestParam(value = "resultId",required = true)Integer resultId){

        ExamResult examResult = queryExamResultDomain.getExamResultById(resultId);
        if(examResult.getStatus().getId() != 6){
            examResult = null;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        String json = new JSONSerializer().exclude("*.examPaper").exclude("*.examResult").exclude("*.class").serialize(examResult);

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




}