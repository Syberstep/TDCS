package com.springapp.mvc.pojo.exam;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**
 * Created by Phuthikorn_T on 6/30/2015.
 */

@Entity
@Table(name = "TDCS_QUESTION_TYPE")
public class QuestionType implements Serializable {

    @Id
    @Column(name = "QUESTION_TYPE_ID")
    private Integer id;

    @Column(name = "QUESTION_TYPE_DESCRIPTION")
    private String description;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof QuestionType)) return false;

        QuestionType that = (QuestionType) o;

        if (getId() != null ? !getId().equals(that.getId()) : that.getId() != null) return false;
        return !(getDescription() != null ? !getDescription().equals(that.getDescription()) : that.getDescription() != null);

    }

    @Override
    public int hashCode() {
        int result = getId() != null ? getId().hashCode() : 0;
        result = 31 * result + (getDescription() != null ? getDescription().hashCode() : 0);
        return result;
    }
}
