package com.springapp.mvc.pojo.exam;

import com.springapp.mvc.pojo.User;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**
 * Created by Phuthikorn_T 6/30/2015.
 */

@Entity
@Table(name="TDCS_CATEGORIES")
public class Category implements Serializable{
    @Id
    @Column(name="CATEGORY_ID", unique = true)
    private  String id;

    @Column(name="CATEGORY_NAME",unique = false)
    private String name;

    @ManyToOne
    @JoinColumn(name="CATEGORY_CREATE_BY")
    private User createBy;

    public String getId() {
        return id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Category)) return false;

        Category category = (Category) o;

        if (getId() != null ? !getId().equals(category.getId()) : category.getId() != null) return false;
        if (getName() != null ? !getName().equals(category.getName()) : category.getName() != null) return false;
        return !(getCreateBy() != null ? !getCreateBy().equals(category.getCreateBy()) : category.getCreateBy() != null);

    }

    @Override
    public int hashCode() {
        int result = getId() != null ? getId().hashCode() : 0;
        result = 31 * result + (getName() != null ? getName().hashCode() : 0);
        result = 31 * result + (getCreateBy() != null ? getCreateBy().hashCode() : 0);
        return result;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getCreateBy() {
        return createBy;
    }

    public void setCreateBy(User createBy) {
        this.createBy = createBy;
    }
}