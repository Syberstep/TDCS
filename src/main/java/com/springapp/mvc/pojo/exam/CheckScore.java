package com.springapp.mvc.pojo.exam;

import com.sun.org.apache.xerces.internal.xs.StringList;

import java.util.Map;
import java.util.Set;

/**
 * Created by JobzPC on 10/11/2558.
 */
public class CheckScore {

    private String categoryName;
    private String subCategoryName;
    private Float subCategoryResultObjectScore;
    private Float subCategoryResultSubjectScore;
    private Float subCategoryMaxScoreObjective;
    private Float subCategoryMaxScoreSubjective;
//    private String comment;
//    private Float objectiveScore;
//    private Float subjectiveScore;


    public Float getSubCategoryMaxScoreObjective() {
        return subCategoryMaxScoreObjective;
    }

    public void setSubCategoryMaxScoreObjective(Float subCategoryMaxScoreObjective) {
        this.subCategoryMaxScoreObjective = subCategoryMaxScoreObjective;
    }

    public Float getSubCategoryMaxScoreSubjective() {
        return subCategoryMaxScoreSubjective;
    }

    public void setSubCategoryMaxScoreSubjective(Float subCategoryMaxScoreSubjective) {
        this.subCategoryMaxScoreSubjective = subCategoryMaxScoreSubjective;
    }

    public Float getSubCategoryResultSubjectScore() {
        return subCategoryResultSubjectScore;
    }

    public void setSubCategoryResultSubjectScore(Float subCategoryResultSubjectScore) {
        this.subCategoryResultSubjectScore = subCategoryResultSubjectScore;
    }


//    public String getComment() {
//        return comment;
//    }
//
//    public void setComment(String comment) {
//        this.comment = comment;
//    }
//
//    public Float getObjectiveScore() {
//        return objectiveScore;
//    }
//
//    public void setObjectiveScore(Float objectiveScore) {
//        this.objectiveScore = objectiveScore;
//    }
//
//    public Float getSubjectiveScore() {
//        return subjectiveScore;
//    }
//
//    public void setSubjectiveScore(Float subjectiveScore) {
//        this.subjectiveScore = subjectiveScore;
//    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getSubCategoryName() {
        return subCategoryName;
    }

    public void setSubCategoryName(String subCategoryName) {
        this.subCategoryName = subCategoryName;
    }

    public Float getSubCategoryResultObjectScore() {
        return subCategoryResultObjectScore;
    }

    public void setSubCategoryResultObjectScore(Float subCategoryResultScore) {
        this.subCategoryResultObjectScore = subCategoryResultScore;
    }
}
