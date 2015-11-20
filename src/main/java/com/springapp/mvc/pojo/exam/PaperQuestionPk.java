package com.springapp.mvc.pojo.exam;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

/**
 * Created by Phuthikorn_T on 17-Sep-15.
 */
@Embeddable
public class PaperQuestionPk implements Serializable {

    @ManyToOne
    private ExamPaper examPaper;

    @ManyToOne
    private Question question;

    public ExamPaper getExamPaper() {
        return examPaper;
    }

    public void setExamPaper(ExamPaper examPaper) {
        this.examPaper = examPaper;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PaperQuestionPk)) return false;

        PaperQuestionPk that = (PaperQuestionPk) o;

        if (getExamPaper() != null ? !getExamPaper().equals(that.getExamPaper()) : that.getExamPaper() != null)
            return false;
        return !(getQuestion() != null ? !getQuestion().equals(that.getQuestion()) : that.getQuestion() != null);

    }

    @Override
    public int hashCode() {
        int result = getExamPaper() != null ? getExamPaper().hashCode() : 0;
        result = 31 * result + (getQuestion() != null ? getQuestion().hashCode() : 0);
        return result;
    }
}
