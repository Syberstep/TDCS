package com.springapp.mvc.pojo.exam;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Phuthikorn_T on 15-Sep-15.
 */
@Entity
@Table(name = "TDCS_PAPER_QUESTION")
@AssociationOverrides({
        @AssociationOverride(name = "pk.examPaper", joinColumns = @JoinColumn(name = "PAPER_ID")),
        @AssociationOverride(name = "pk.question", joinColumns = @JoinColumn(name = "QUESTION_ID"))
})
public class PaperQuestion implements Serializable {

    @EmbeddedId
    private PaperQuestionPk pk = new PaperQuestionPk();

    @Column(name = "SCORE")
    private Float score;

    public PaperQuestionPk getPk() {
        return pk;
    }

    public void setPk(PaperQuestionPk pk) {
        this.pk = pk;
    }

    @Transient
    public ExamPaper getExamPaper() {
        return pk.getExamPaper();
    }

    public void setExamPaper(ExamPaper ep) {
        pk.setExamPaper(ep);
    }

    @Transient
    public Question getQuestion() {
        return pk.getQuestion();
    }

    public void setQuestion(Question q) {
        pk.setQuestion(q);
    }

    public Float getScore() {
        return score;
    }

    public void setScore(Float score) {
        this.score = score;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PaperQuestion)) return false;

        PaperQuestion that = (PaperQuestion) o;

        if (getPk() != null ? !getPk().equals(that.getPk()) : that.getPk() != null) return false;
        return !(getScore() != null ? !getScore().equals(that.getScore()) : that.getScore() != null);

    }

    @Override
    public int hashCode() {
        int result = getPk() != null ? getPk().hashCode() : 0;
        result = 31 * result + (getScore() != null ? getScore().hashCode() : 0);
        return result;
    }
}
