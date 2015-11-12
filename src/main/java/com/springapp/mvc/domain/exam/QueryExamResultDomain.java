package com.springapp.mvc.domain.exam;

import com.springapp.mvc.pojo.User;
import com.springapp.mvc.pojo.Position;
import com.springapp.mvc.pojo.exam.ExamPaper;
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
//create by JOB
    public List<ExamResult> getExamResultById2(Integer id){
        Criteria criteria = getSession().createCriteria(ExamResult.class,"er");
        criteria.createAlias("er.status", "status");
        criteria.createAlias("er.examRecord", "examRecord");
        criteria.createAlias("examRecord.examAnswerRecords", "examAnswerRecords");
        criteria.createAlias("examAnswerRecords.question", "question");
        criteria.createAlias("question.subCategory", "subCategory");
        criteria.createAlias("subCategory.category", "category");
        criteria.add(Restrictions.eq("er.id", id));
//        criteria.setProjection(Projections.projectionList()
//                .add(Projections.groupProperty("question.id"))
//                .add(Projections.groupProperty("question"))
//                .add(Projections.groupProperty("category.name"))
//                .add(Projections.groupProperty("subCategory.id")));

//        criteria.addOrder(Order.desc("category.name")).addOrder(Order.desc("subCategory.name"));
        criteria.addOrder(Order.desc("category.id"));
//        criteria.addOrder(Order.desc("subCategory.id"));
        criteria.setResultTransformer(criteria.DISTINCT_ROOT_ENTITY);
        List<ExamResult> empList = criteria.list();
        return empList;
    }

    public List<ExamResult> getUserResult(User user) {
        Criteria criteria = getSession().createCriteria(ExamResult.class, "result");
        criteria.createAlias("result.examRecord", "record");
        criteria.createAlias("result.status", "status");

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
        criteria.createAlias("er.status","status");
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
        criteria.addOrder(Order.asc("status.id"));
        criteria.addOrder(Order.desc("paper.id"));
        criteria.addOrder(Order.desc("user.userId"));
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        List<ExamResult> empList = criteria.list();
        return empList;
    }
    public void updateExamResult(ExamResult examResult) {
        getSession().merge(examResult);
    }

//    Add By Mr.Wanchana K
    public Boolean checkResultIsDone(List<ExamRecord> examRecord){

        Boolean check = false;
        Criteria criteria = getSession().createCriteria(ExamResult.class);
        criteria.add(Restrictions.in("examRecord", examRecord));

        if(criteria.list().size() != 0){
            List<ExamResult> examResults = criteria.list();
            for(int i = 0; i < (examResults.size() - 1); i++){
                if(examResults.get(i).getStatus().getId() == 7){
                    check = false;
                }
                else{
                    check = true;
                    break;
                }
            }
        }

        return check;
    }
}
