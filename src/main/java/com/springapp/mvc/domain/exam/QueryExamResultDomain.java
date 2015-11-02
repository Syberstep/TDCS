package com.springapp.mvc.domain.exam;

import com.springapp.mvc.pojo.User;
import com.springapp.mvc.pojo.Position;
import com.springapp.mvc.pojo.exam.ExamRecord;
import com.springapp.mvc.pojo.exam.ExamResult;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.hibernate.criterion.*;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Created by PTang_000 on 29-Sep-15.
 */
@Service
public class QueryExamResultDomain extends HibernateUtil {

    @Autowired
    QueryStatusDomain queryStatusDomain;

    private static final java.util.logging.Logger logger = java.util.logging.Logger.getLogger(QueryExamResultDomain.class.getName());
    public void saveExamResult(ExamResult examResult){
        getSession().save(examResult);
    }

    public ExamResult getExamResultById(Integer id){
        Criteria criteria = getSession().createCriteria(ExamResult.class,"er");
        criteria.createAlias("er.status","status");
        criteria.add(Restrictions.eq("er.id", id));
        return (ExamResult) criteria.uniqueResult();
    }

    public List<ExamResult> getUserResult(User user) {
        Criteria criteria = getSession().createCriteria(ExamResult.class, "result");
        criteria.createAlias("result.examRecord", "record");
        criteria.createAlias("result.status","status");

//        Criterion criterion1 = Restrictions.eq("result.status", queryStatusDomain.getMarkedStatus());
//        Criterion criterion2 = Restrictions.eq("result.status", queryStatusDomain.getMarkConfirmedStatus());

//        criteria.add(criterion2);
        criteria.add(Restrictions.eq("record.user", user));
        criteria.addOrder(Order.desc("status.id"));

        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        return criteria.list();
    }
    /**
     * Created by JobzPC on 7/10/2558.
     */
    public List<ExamResult> getAllExamResult(List<Integer> userId,String code,Position posiId,String empId) {
        Criteria criteria = getSession().createCriteria(ExamResult.class, "er");
        criteria.createAlias("er.examRecord", "examRecord");
        criteria.createAlias("examRecord.paper", "paper");
        criteria.createAlias("examRecord.user", "user");
        criteria.createAlias("paper.createBy", "createBy");
        if (userId.size()!=0){

            criteria.add(Restrictions.in("createBy.userId", userId));
        }
        if (!(code.equals(""))) {
            criteria.add(Restrictions.like("paper.code", "%" + code + "%"));
        }
        if(posiId != null){
            criteria.add(Restrictions.eq("user.position", posiId));
        }
        if (!(empId.equals(""))) {
            criteria.add(Restrictions.like("user.empId", "%" + empId + "%"));
        }
//        ProjectionList projList = Projections.projectionList()
//                .add(Projections.property("er.id"), "id")
//                .add(Projections.property("er.examRecord"),"examRecord")
//                .add(Projections.property("er.objectiveScore"),"objectiveScore")
//                .add(Projections.property("er.subjectiveScore"), "subjectiveScore")
//                .add(Projections.property("er.status"), "status")
//                .add(Projections.property("paper.id"),"peperid")
//                .add(Projections.property("user.userId"),"userId")
//            .add(Projections.property("examRecord.postTestRecord"), "postTestRecord");
//
//        criteria.setProjection(Projections.distinct(projList));
        criteria.addOrder(Order.desc("paper.id"));
        criteria.addOrder(Order.desc("user.userId"));
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        List<ExamResult> empList = criteria.list();
        return empList;
    }

    public void updateExamResult(ExamResult examResult) {
        getSession().merge(examResult);
    }
}
