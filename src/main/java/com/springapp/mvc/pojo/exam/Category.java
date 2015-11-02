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