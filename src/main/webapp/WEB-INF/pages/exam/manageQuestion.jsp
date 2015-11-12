<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%--
  Created by IntelliJ IDEA.
  User: wanchana
  Date: 15/7/2558
  Time: 17:16
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';

    if('${status}' == 'user' || '${status}' == ''){
        window.location.href =context+ "/TDCS/index.html";
    }
</script>

<%--<%@include file="modal/createQuestionModal.jsp" %>--%>
<tiles:insertTemplate template="/WEB-INF/pages/exam/modal/createQuestionModal.jsp"/>
<%--<%@include file="modal/questionDetailModal.jsp" %>--%>
<tiles:insertTemplate template="/WEB-INF/pages/exam/modal/questionDetailModal.jsp"/>

<script>
    if ('${status}' == 'user' || '${status}' == '') {
        window.location.href = context+"/TDCS/index.html";
    }
</script>

<div class="container row">
    <h3 class="h3">จัดการข้อสอบ</h3>
</div>
<hr/>

<div class="container">
    <%--<%@include file="template/searchQuestionTemplateNew.jsp" %>--%>
    <tiles:insertTemplate template="/WEB-INF/pages/exam/template/searchQuestionTemplateNew.jsp"/>

    <!-- Example table information, it will remove soon ^^ -->
    <div class="row">
        <div class="col-md-12">
            <div class="row" style="margin-bottom: 5px;">
                <div class="col-md-12">
                    <button class="btn btn-success btn-sm createQuestionBtn"
                            data-toggle="modal" data-target="#createQuest">
                        <span class="glyphicon glyphicon-plus"></span>
                    </button>
                    <button class="btn btn-danger btn-sm deleteSelectedBtn "><span
                            class="glyphicon glyphicon-minus"></span>
                    </button>
                </div>
            </div>
            <table class="table">
                <thead class="bg-primary label-primary small">
                <tr>
                    <%--<th style="text-align: center">หมายเลขข้อสอบ</th>--%>
                    <th style="vertical-align:middle;"> <input type="checkbox" id="selectAllItem"/> </th>
                    <th>ประเภทข้อสอบ</th>
                    <th>หมวดหมู่</th>
                    <th>หัวข้อเรื่อง</th>

                    <th width="35%">คำถาม</th>
                    <%--<th style="text-align: center">ระดับความยาก</th>--%>
                    <th>คะแนน</th>
                    <th>ผู้สร้าง</th>
                    <th>วันที่สร้าง</th>
                    <th>แก้ไข</th>
                    <%--<th style="text-align: center">Action</th>--%>
                </tr>
                </thead>
                <tbody align="center" id="tableBody">

                </tbody>
            </table>

            <div class="bg-info" id="searchCatNotFound" hidden>
                <%--<p class="bg-info">--%>
                <h3 id="searchCatDescNotFound" style="text-align: center;" >ไม่พบข้อมูลที่ค้นหา</h3>
                <%--</p>--%>
            </div>

        </div>
    </div>
</div>
</div>

<script src="${context}/resources/js/pageScript/exam/manageQuestion.js" charset="UTF-8"></script>

<style>
    th {
        border: solid 1px white;
        text-align: center;
        padding: 0px 0px 0px 50px;
    }

    td{
        vertical-align: middle;
    }

    #tableBody td{
        font-size: 13px;
    }

    #searchCatNotFound{
        background-color: #b2e0ff;
        height: 100px;
        display: none;
        top: 40px;
        vertical-align: middle;
        border-radius: 5px;
        margin-top: -15px;
    }
    #searchCatDescNotFound{
        text-align: center;
        vertical-align: middle;
        line-height: 100px;
        color: #00647f;
    }

</style>

