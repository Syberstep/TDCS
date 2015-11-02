package com.springapp.mvc.domain.exam;

import com.springapp.mvc.pojo.exam.Boo;
import com.springapp.mvc.pojo.Position;
import com.springapp.mvc.pojo.exam.ExamPaper;
import com.springapp.mvc.pojo.exam.ExamRecord;
import com.springapp.mvc.pojo.exam.ExamResult;
import com.springapp.mvc.util.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Phuthikorn_T on 18-Sep-15.
 */
@Service
public class QueryExamRecordDomain extends HibernateUtil {

    public void saveExamRecord(ExamRecord examRecord){

        getSession().save(examRecord);
    }

    public ExamRecord getExamRecordById(Integer id) {
        Criteria criteria = getSession().createCriteria(ExamRecord.class);
        criteria.add(Restrictions.eq("id", id));
        return (ExamRecord)criteria.uniqueResult();
    }

    public ExamRecord getPreTestRecord(ExamRecord examRecord) {
        Criteria criteria = getSession().createCriteria(ExamRecord.class);
        criteria.add(Restrictions.eq("paper",examRecord.getPaper()));
        criteria.add(Restrictions.eq("user",examRecord.getUser()));
        criteria.add(Restrictions.isNull("preTestRecord"));
        return (ExamRecord)criteria.uniqueResult();
    }

    public List<ExamRecord> getExamRecordByPaperCode(String paperCode) {
        Criteria criteria = getSession().createCriteria(ExamRecord.class, "er");
        criteria.createAlias("er.paper", "paper");
        criteria.add(Restrictions.eq("paper.code", paperCode));
        return criteria.list();
    }

//    Add By Mr.Wanchana
    public Boolean checkExamRecordInUse(Integer paperId){

        Boolean check = false;
        QueryPaperDomain queryPaperDomain = new QueryPaperDomain();
        ExamPaper examPaper = queryPaperDomain.getPaperById(paperId);
        Criteria criteria = getSession().createCriteria(ExamRecord.class);
        criteria.add(Restrictions.eq("paper", examPaper));

        if(criteria.list().size() != 0){
            check = true;
        }

        return check;
    }
}
