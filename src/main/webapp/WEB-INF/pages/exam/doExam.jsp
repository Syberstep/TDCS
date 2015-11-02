<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: wanchana
  Date: 29/7/2558
  Time: 13:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>
<script>
    if ('${status}' == '') {
        window.location.href = "/TDCS/index.html";
    }
</script>


<c:if test="${user != null}">
    <div class="examHead" id="examHead" paperId="${paper.id}" timeLimit-minute="${paper.timeLimit}">
        <div class="container row">

            <div class="row text-center">
                <h3>ข้อสอบออนไลน์</h3>
                <hr/>
            </div>
        </div>
        <div class="container">
            <div class="row text-left">
                <div class="col-md-6">
                    <h4 style="display: inline;">ชุดข้อสอบ&nbsp;:&nbsp;</h4>${paper.name}
                </div>
                <div class="col-md-6 text-right">
                    เวลาในการทำข้อสอบ ${paper.timeLimit} นาที
                </div>
            </div>
                <%--<br/>--%>
            <br/><br/>
        </div>
    </div>

    <div id="examBody">

    </div>

    <div class="examFooter">
        <div class="row">
            <div class="col-md-12 text-right">
                <button class="btn btn-primary" id="SendPaper" data-toggle="modal"
                        data-target="#submitExamConfirmModal">
                    ส่งชุดข้อสอบ
                </button>
            </div>
        </div>
    </div>
    </div>

    <div id="countdownContainer" class="btn btn-success" style="position: fixed; left: 0;bottom: 0;">
        <div>
            <div class="">&nbsp;เวลาที่เหลือ</div>
            <span id="countdown">00:00:00</span>
        </div>
    </div>

    <div id="pageTraveller" style="position: fixed; right: 0;bottom: 0;">
        <div id="toTop" class="btn btn-default"><span class="glyphicon glyphicon-upload"></span></div>
        <br>

        <div id="toBottom" class="btn btn-default"><span class="glyphicon glyphicon-download"></span></div>
    </div>

    <div class="modal fade " role="dialog" id="submitExamConfirmModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body row">
                    <div class="col-md-12 text-center" id="submitExamConfirmMessage">
                    </div>
                </div>
                    <%--<hr>--%>
                <div class="modal-footer">
                    <div class="col-md-12 text-center">
                    <span class="forUnfinished">
                        <button id="goToUnfinish" class="btn btn-info" data-dismiss="modal">ไปยังข้อที่&nbsp;
                            <div id="unfinishQuestionNumber"></div>
                        </button>
                        &nbsp;
                    </span>
                        <button id="confirmSubmitExam" class="btn btn-primary">ส่งข้อสอบ</button>
                        &nbsp;
                        <button id="cancleSubmitExam" class="btn btn-danger" data-dismiss="modal">ยกเลิก</button>


                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="../../../resources/js/pageScript/exam/doExam.js"></script>
    <script src="../../../resources/js/jquery.timer.js"></script>
</c:if>

<c:if test="${user == null}">
    <div class="text-center">
        <h1>กรุณาเข้าสู่ระบบก่อนทำข้อสอบ</h1>
    </div>
</c:if>
