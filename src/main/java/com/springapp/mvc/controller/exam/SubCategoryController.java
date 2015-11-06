package com.springapp.mvc.controller.exam;

import com.google.gson.Gson;
import com.springapp.mvc.domain.QueryUserDomain;
import com.springapp.mvc.domain.exam.QueryCategoryDomain;
import com.springapp.mvc.domain.exam.QuerySubCategoryDomain;
import com.springapp.mvc.pojo.User;
import com.springapp.mvc.pojo.exam.Category;
import com.springapp.mvc.pojo.exam.SubCategory;
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
import javax.validation.Valid;
import java.util.List;
import java.util.logging.Logger;

/**
 * Created by Phuthikorn_T on 8/7/2015.
 */
@Controller
@RequestMapping("/TDCS")
public class SubCategoryController {

    @Autowired
    QueryUserDomain queryUserDomain;

    @Autowired
    QuerySubCategoryDomain querySubCategoryDomain;

    @Autowired
    QueryCategoryDomain queryCategoryDomain;

    private static final Logger logger = Logger.getLogger(SubCategoryController.class.getName());

    @RequestMapping(method = RequestMethod.POST, value = "/exam/addSubCategory")
    @ResponseBody
    public ResponseEntity<String> addSubCategory(Model model,
                               @RequestParam(value = "categoryId", required = true) String categoryId,
                               @RequestParam(value = "subcategoryNameadd", required = true) String subcategoryName,
                               HttpServletRequest request, HttpServletResponse response) {
//            throws Exception {

        SubCategory subCategory = new SubCategory();

        subCategory.setName(subcategoryName);
        subCategory.setCategory(queryCategoryDomain.getCategoryById(categoryId));

        User currentUser = queryUserDomain.getCurrentUser(request);

        subCategory.setCreateBy(currentUser);

        querySubCategoryDomain.insertSubCategory(subCategory);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        String json = new Gson().toJson(subCategory);
        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    //end add
    @RequestMapping(value = "/exam/getAllSubCategory", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> getAllSubCategory() {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List<SubCategory> subcategories = querySubCategoryDomain.getListSubCategories();
        String json = new Gson().toJson(subcategories);
//        logger.info(subcategories.toString());

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/deleteSubCategory", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity deleteSubCategory(@ModelAttribute("id") Integer subCategoryId) {

        querySubCategoryDomain.deleteSubCategory(subCategoryId);


        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/editSubCategory", method = RequestMethod.POST)
    @ResponseBody
    public void editSubCategory(Model model,
//                              @RequestParam(value = "categoryId", required = true) String categoryId,
                                @RequestParam(value = "subcategoryId", required = true) Integer subcategoryId,

                                @RequestParam(value = "subcategoryName", required = true) String subcategoryName,
                                HttpServletRequest request, HttpServletResponse response) {

        SubCategory subCategory = querySubCategoryDomain.getSubCategoryById(subcategoryId);
        subCategory.setName(subcategoryName);
//        subCategory.setCategory(queryCategoryDomain.getCategoryById(categoryId));
        User currentUser = queryUserDomain.getCurrentUser(request);
        subCategory.setCreateBy(currentUser);
        querySubCategoryDomain.editSubCategory(subCategory);
    }

    @RequestMapping(value = "/exam/searchSubCategory", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> searchSubCategory(@ModelAttribute("subcategoryName") String subcategoryName,
                                                    @ModelAttribute("categoryId") String categoryId,
                                                    @ModelAttribute("categoryName") String categoryName)
//                                                    @ModelAttribute("subcategoryId") Integer subcategoryId)
    {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");
        List<SubCategory> subcategories = querySubCategoryDomain.searchSubCategory(subcategoryName, categoryId, categoryName);
        logger.info(String.valueOf("++++++++++++++++++++++++++++"));
        System.out.println("AAA : " + subcategories);

        String json = new Gson().toJson(subcategories);
        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }


    @RequestMapping(value = "/exam/getAllSubCategoryInCategory", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> getAllSubCategory(@RequestParam(value = "categoryId", required = true) String catId) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List<SubCategory> subcategories = null;

        if (catId.length() == 0) {
            return null;
//            subcategories = querySubCategoryDomain.getAllSubCategory();
        } else {
            Category category = queryCategoryDomain.getCategoryById(catId);
            subcategories = querySubCategoryDomain.getSubCategoryListByCategory(category);
        }

        String json = new Gson().toJson(subcategories);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/getSubCategoryByCategoryId", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> getSubCategoryByCategoryId(@RequestBody String searchSubCategory) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        List<SubCategory> subcategories = null;
        if (searchSubCategory != null && searchSubCategory != "") {
            Category category = queryCategoryDomain.getCategoryById(searchSubCategory);
            subcategories = querySubCategoryDomain.getSubCategoryListByCategory(category);
        } else {
//            subcategories = querySubCategoryDomain.getSubCategoryListByCategory(null);
        }

        String json = new Gson().toJson(subcategories);

        logger.info(subcategories.toString());
        System.out.println("TEST : " + searchSubCategory);

        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/exam/getSubCategoryToDropDown", method = RequestMethod.POST)
    @ResponseBody

    public ResponseEntity<String> getSubCategoryToDropDown(@RequestParam(value = "categoryId", required = false) String categoryId,
                                                           @RequestParam(value = "categoryName", required = false) String categoryName) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=UTF-8");

        ///

        List<SubCategory> subCategoriesToDropDown = querySubCategoryDomain.getSubCategoryToDropDown(categoryId, categoryName);
        logger.info(String.valueOf("++++++++++++++++++++++++++++"));
        System.out.println("AAA : " + subCategoriesToDropDown);

        String json = new Gson().toJson(subCategoriesToDropDown);
        return new ResponseEntity<String>(json, headers, HttpStatus.OK);

    }


//    @RequestMapping(value = "/exam/LOVSubCategory", method = RequestMethod.POST)
//    @ResponseBody
//
//    public ResponseEntity<String> LOVSubCategory(@RequestParam(value = "categoryId", required = false) String categoryId) {
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Type", "application/json;charset=UTF-8");
//        List<SubCategory> LOVSubCategory = querySubCategoryDomain.LOVSubCategory(categoryId);
//        logger.info(String.valueOf("++++++++++++++++++++++++++++"));
//        System.out.println("AAA : " + LOVSubCategory);
//
//        String json = new Gson().toJson(LOVSubCategory);
//        return new ResponseEntity<String>(json, headers, HttpStatus.OK);
//
//    }
}

