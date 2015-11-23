package com.springapp.mvc.pojo.exam;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Phuthikorn_T on 7/1/2015.
 */
@Entity
@Table(name="TDCS_EXAM_ANSWER_RECORDS")
public class ExamAnswerRecord implements Serializable {

    @Id
    @GenericGenerator(name="answer_record_id" , strategy="increment")
    @GeneratedValue(generator="answer_record_id")
    @Column(name="ANSWER_RECORD_ID")
    private Integer id;

    @ManyToOne
    @JoinColumn(name="QUESTION_ID")
    private Question question;

    @ManyToOne
    @JoinColumn(name="ANSWER_OBJECTIVE")
    private Choice answerObjective;

    @Column(name="ANSWER_SUBJECTIVE")
    private String answerSubjective;

    @ManyToOne
    @JoinColumn(name = "EXAM_RECORD_ID")
    private ExamRecord examRecord;

    @OneToOne(mappedBy = "answerRecord")
    private ExamMarkingRecord markingRecord;

    public ExamMarkingRecord getMarkingRecord() {
        return markingRecord;
    }

    public void setMarkingRecord(ExamMarkingRecord markingRecord) {
        this.markingRecord = markingRecord;
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

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question questionId) {
        this.question = questionId;
    }

    public Choice getAnswerObjective() {
        return answerObjective;
    }

    public void setAnswerObjective(Choice answerObjective) {
        this.answerObjective = answerObjective;
    }

    public String getAnswerSubjective() {
        return answerSubjective;
    }

    public void setAnswerSubjective(String answerSubjective) {
        this.answerSubjective = answerSubjective;
    }

}
