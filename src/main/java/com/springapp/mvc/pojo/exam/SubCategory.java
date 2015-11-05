package com.springapp.mvc.pojo.exam;

import com.springapp.mvc.pojo.User;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Phuthikorn_T on 6/30/2015.
 */

@Entity
@Table(name="TDCS_SUB_CATEGORIES")
public class SubCategory implements Serializable {

    @Id
    @GenericGenerator(name="SubCategory_id" , strategy="increment")
    @GeneratedValue(generator="SubCategory_id")
    @Column(name="SUB_CATEGORY_ID")
    private Integer id;

    @Column(name="SUB_CATEGORY_NAME")
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="CATEGORY_ID")
    private Category category;

    @ManyToOne
    @JoinColumn(name="SUB_CATEGORY_CREATE_BY",referencedColumnName = "USER_ID")
    private User createBy;

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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category categoryId) {
        this.category = categoryId;
    }

    public User getCreateBy() {
        return createBy;
    }

    public void setCreateBy(User createBy) {
        this.createBy = createBy;
    }

}
