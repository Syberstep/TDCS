package com.springapp.mvc.pojo.exam;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**
 * Created by Phuthikorn_T on 6/30/2015.
 */


@Entity
@Table(name = "TDCS_DIFFICULTIES")
public class Difficulty implements Serializable {

    @Id
    @Column(name = "DIFFICULTY_LEVEL")
    private Integer level;

    @Column(name = "DIFFICULTY_DESCRIPTION")
    private String description;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Difficulty)) return false;

        Difficulty that = (Difficulty) o;

        if (getLevel() != null ? !getLevel().equals(that.getLevel()) : that.getLevel() != null) return false;
        return !(getDescription() != null ? !getDescription().equals(that.getDescription()) : that.getDescription() != null);

    }

    @Override
    public int hashCode() {
        int result = getLevel() != null ? getLevel().hashCode() : 0;
        result = 31 * result + (getDescription() != null ? getDescription().hashCode() : 0);
        return result;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
