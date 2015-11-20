package com.springapp.mvc.pojo.exam;

import com.springapp.mvc.pojo.User;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by Phuthikorn_T on 7/1/2015.
 */

@Entity
@Table(name = "TDCS_EXAM_RESULTS")
public class ExamResult implements Serializable {

    @Id
    @GenericGenerator(name = "exam_result_id", strategy = "increment")
    @GeneratedValue(generator = "exam_result_id")
    @Column(name = "RESULT_ID")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "MARKED_BY", referencedColumnName = "USER_ID")
    private User markedBy;

    @Column(name = "COMMENTING")
    private String comment;

    @Column(name = "OBJECTIVE_SCORE")
    private Float objectiveScore;

    @Column(name = "SUBJECTIVE_SCORE")
    private Float subjectiveScore;

    @Column(name = "MARKED_DATE")
    private Date markedDate;

    @OneToOne
    @JoinColumn(name = "EXAM_RECORD_ID")
    private ExamRecord examRecord;

    @ManyToOne
    @JoinColumn(name = "RESULT_STATUS")
    private Status status;

    @Column(name = "VERSION")
    private Integer version;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ExamResult)) return false;

        ExamResult that = (ExamResult) o;

        if (getId() != null ? !getId().equals(that.getId()) : that.getId() != null) return false;
        if (getMarkedBy() != null ? !getMarkedBy().equals(that.getMarkedBy()) : that.getMarkedBy() != null)
            return false;
        if (getComment() != null ? !getComment().equals(that.getComment()) : that.getComment() != null) return false;
        if (getObjectiveScore() != null ? !getObjectiveScore().equals(that.getObjectiveScore()) : that.getObjectiveScore() != null)
            return false;
        if (getSubjectiveScore() != null ? !getSubjectiveScore().equals(that.getSubjectiveScore()) : that.getSubjectiveScore() != null)
            return false;
        if (getMarkedDate() != null ? !getMarkedDate().equals(that.getMarkedDate()) : that.getMarkedDate() != null)
            return false;
        if (getExamRecord() != null ? !getExamRecord().equals(that.getExamRecord()) : that.getExamRecord() != null)
            return false;
        if (getStatus() != null ? !getStatus().equals(that.getStatus()) : that.getStatus() != null) return false;
        return !(getVersion() != null ? !getVersion().equals(that.getVersion()) : that.getVersion() != null);

    }

    @Override
    public int hashCode() {
        int result = getId() != null ? getId().hashCode() : 0;
        result = 31 * result + (getMarkedBy() != null ? getMarkedBy().hashCode() : 0);
        result = 31 * result + (getComment() != null ? getComment().hashCode() : 0);
        result = 31 * result + (getObjectiveScore() != null ? getObjectiveScore().hashCode() : 0);
        result = 31 * result + (getSubjectiveScore() != null ? getSubjectiveScore().hashCode() : 0);
        result = 31 * result + (getMarkedDate() != null ? getMarkedDate().hashCode() : 0);
        result = 31 * result + (getExamRecord() != null ? getExamRecord().hashCode() : 0);
        result = 31 * result + (getStatus() != null ? getStatus().hashCode() : 0);
        result = 31 * result + (getVersion() != null ? getVersion().hashCode() : 0);
        return result;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Date getMarkedDate() {
        return markedDate;
    }

    public void setMarkedDate(Date markedDate) {
        this.markedDate = markedDate;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public ExamRecord getExamRecord() {
        return examRecord;
    }

    public void setExamRecord(ExamRecord examRecordId) {
        this.examRecord = examRecordId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getMarkedBy() {
        return markedBy;
    }

    public void setMarkedBy(User markedBy) {
        this.markedBy = markedBy;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Float getObjectiveScore() {
        return objectiveScore;
    }

    public void setObjectiveScore(Float objectiveScore) {
        this.objectiveScore = objectiveScore;
    }

    public Float getSubjectiveScore() {
        return subjectiveScore;
    }

    public void setSubjectiveScore(Float subjectiveScore) {
        this.subjectiveScore = subjectiveScore;
    }
}
