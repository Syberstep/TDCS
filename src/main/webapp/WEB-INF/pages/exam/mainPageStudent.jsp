<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: JOKIZZ
  Date: 29/7/2558
  Time: 11:15
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>


<div class="container row">
    <h3 class="h3">เลือกทำข้อสอบ</h3>
</div>
<hr/>

<div class="container">
    <div class="row">
        <table class="table table-bordered table-hover">
            <thead class="label-primary small bg-primary">
            <tr>
                <th style="text-align: center">ชื่อชุดข้อสอบ</th>
                <th style="text-align: center">ชื่อผู้สร้าง</th>
                <th style="text-align: center">ตำแหน่ง</th>
                <th style="text-align: center">คะแนนเต็ม</th>
                <th style="text-align: center">เวลา</th>
                <th style="text-align: center">Action</th>
            </tr>
            </thead>
            <tbody>

            <!-- Available Paper -->
            <c:forEach var="paper" items="${openPaperList}">
                <tr>
                    <td>${paper.name}</td>
                    <td>${paper.createBy.thFname}&nbsp;${paper.createBy.thLname}</td>
                    <c:if test="${paper.position.posiName != null}">
                        <td>${paper.position.posiName}</td>
                    </c:if>
                    <c:if test="${paper.position.posiName == null}">
                        <td>ทั้งหมด</td>
                    </c:if>
                    <td align="center">${paper.maxScore}</td>
                    <td align="center">${paper.timeLimit} นาที</td>
                    <td style="text-align: center;">
                            <%--<a class="doExamBtn" location="${context}/TDCS/exam/doExam?paperId=${paper.id}">--%>
                        <button class="btn btn-block btn-primary doExamBtn" paperId="${paper.id}" type="button">
                            เริ่มทำข้อสอบ
                        </button>
                            <%--</a>--%>
                    </td>
                </tr>
            </c:forEach>

            <!-- Paper That has been done -->
            <c:forEach var="paper" items="${donePaperList}">
                <tr>
                    <td>${paper.name}</td>
                    <td>${paper.createBy.thFname}&nbsp;${paper.createBy.thLname}</td>
                    <c:if test="${paper.position.posiName != null}">
                        <td>${paper.position.posiName}</td>
                    </c:if>
                    <c:if test="${paper.position.posiName == null}">
                        <td>ทั้งหมด</td>
                    </c:if>
                    <td align="center">${paper.maxScore}</td>
                    <td align="center">${paper.timeLimit} นาที</td>
                    <td style="text-align: center;">
                        <button class="btn btn-block" type="button" disabled>เคยทำข้อสอบชุดนี้ไปแล้ว</button>
                    </td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
    </div>
</div>

<div class="modal fade" id="confirmationModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header" align="center">
                เมื่อเริ่มทำข้อสอบแล้วออกจากหน้าระบบจะทำการบันทึกข้อมูลทันที<br>และจะทำให้ไม่สามารถเข้าทำข้อสอบนี้ได้อีก
                <br><br>
                ต้องการที่จะทำข้อสอบนี้หรือไม่
            </div>
            <div class="modal-body" align="center">
                <div class="row">
                    <div class="col-md-3 col-md-offset-3">
                        <button class="btn btn-primary btn-block" id="doExamConfirmedBtn">&nbsp;ใช่&nbsp;</button>
                    </div>

                    <div class="col-md-3">
                        <button class="btn btn-warning btn-block" data-dismiss="modal">&nbsp;ไม่&nbsp;</button>
                    </div>
                </div>


            </div>
        </div>
    </div>
</div>

<script src="../../../resources/js/pageScript/exam/mainPageStudent.js"></script>
