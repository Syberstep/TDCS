package com.springapp.mvc.pojo.exam;

import com.springapp.mvc.pojo.User;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Phuthikorn_T on 7/15/2015.
 */
@Entity
@Table(name = "TDCS_EXAM_MARKING_RECORD")
public class ExamMarkingRecord implements Serializable {

    @Id
    @GenericGenerator(name = "marking_record_id", strategy = "increment")
    @GeneratedValue(generator = "marking_record_id")
    @Column(name = "MARKING_RECORD_ID")
    private Integer id;

    @Column(name = "MARKING_SCORE")
    private Float markingScore;

    @OneToOne
    @JoinColumn(name = "ANSWER_RECORD_ID")
    private ExamAnswerRecord answerRecord;

    @ManyToOne
    @JoinColumn(name = "MARKED_BY")
    private User markedBy;

    @ManyToOne
    @JoinColumn(name = "EXAM_RESULT_ID")
    private ExamResult examResult;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ExamMarkingRecord)) return false;

        ExamMarkingRecord that = (ExamMarkingRecord) o;

        if (getId() != null ? !getId().equals(that.getId()) : that.getId() != null) return false;
        if (getMarkingScore() != null ? !getMarkingScore().equals(that.getMarkingScore()) : that.getMarkingScore() != null)
            return false;
        if (getAnswerRecord() != null ? !getAnswerRecord().equals(that.getAnswerRecord()) : that.getAnswerRecord() != null)
            return false;
        if (getMarkedBy() != null ? !getMarkedBy().equals(that.getMarkedBy()) : that.getMarkedBy() != null)
            return false;
        return !(getExamResult() != null ? !getExamResult().equals(that.getExamResult()) : that.getExamResult() != null);

    }

    @Override
    public int hashCode() {
        int result = getId() != null ? getId().hashCode() : 0;
        result = 31 * result + (getMarkingScore() != null ? getMarkingScore().hashCode() : 0);
        result = 31 * result + (getAnswerRecord() != null ? getAnswerRecord().hashCode() : 0);
        result = 31 * result + (getMarkedBy() != null ? getMarkedBy().hashCode() : 0);
        result = 31 * result + (getExamResult() != null ? getExamResult().hashCode() : 0);
        return result;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Float getMarkingScore() {
        return markingScore;
    }

    public void setMarkingScore(Float markingScore) {
        this.markingScore = markingScore;
    }

    public ExamAnswerRecord getAnswerRecord() {
        return answerRecord;
    }

    public void setAnswerRecord(ExamAnswerRecord answerRecord) {
        this.answerRecord = answerRecord;
    }

    public User getMarkedBy() {
        return markedBy;
    }

    public void setMarkedBy(User markedBy) {
        this.markedBy = markedBy;
    }

    public ExamResult getExamResult() {
        return examResult;
    }

    public void setExamResult(ExamResult examResult) {
        this.examResult = examResult;
    }
}
