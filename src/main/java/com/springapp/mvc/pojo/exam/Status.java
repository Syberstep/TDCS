package com.springapp.mvc.pojo.exam;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**
 * Created by Phuthikorn_T on 7/13/2015.
 */
@Entity
@Table(name = "TDCS_STATUS")
public class Status implements Serializable {

    @Id
    @Column(name = "STATUS_ID")
    private Integer id;

    @Column(name = "STATUS_NAME")
    private String name;

    @Column(name = "STATUS_DESCRIPTION")
    private String description;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
        if (!(o instanceof Status)) return false;

        Status status = (Status) o;

        if (getId() != null ? !getId().equals(status.getId()) : status.getId() != null) return false;
        if (getName() != null ? !getName().equals(status.getName()) : status.getName() != null) return false;
        return !(getDescription() != null ? !getDescription().equals(status.getDescription()) : status.getDescription() != null);

    }

    @Override
    public int hashCode() {
        int result = getId() != null ? getId().hashCode() : 0;
        result = 31 * result + (getName() != null ? getName().hashCode() : 0);
        result = 31 * result + (getDescription() != null ? getDescription().hashCode() : 0);
        return result;
    }
}
