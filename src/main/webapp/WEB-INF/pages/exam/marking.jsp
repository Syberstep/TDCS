<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: PTang_000
  Date: 7/29/2015
  Time: 1:13 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>
<script>
    if ('${status}' == 'user' || '${status}' == '') {
        window.location.href = context+"/TDCS/index.html";
    }
</script>


<c:if test="${user != null}">
    <c:set var="questionNumber" value="${1}"/>

    <h3>ตรวจข้อสอบ</h3>
    <hr>
    <h4>ข้อมูลนักศึกษา</h4>

    <div class="row">
        <div class="col-md-2 text-right">ชื่อ :</div>
        <div class="col-md-4">
            <span id="firstName">${examResult.examRecord.user.thFname}</span>
            <span id="lastName">${examResult.examRecord.user.thLname}</span>
        </div>
        <div class="col-md-2 text-right">รหัสพนักงาน :</div>
        <div class="col-md-4">
            <span id="empId">${examResult.examRecord.user.empId}</span>
        </div>
    </div>
    <br>

    <div class="row">
        <div class="col-md-2 text-right">ทีม :</div>
        <div class="col-md-4">
            <span id="team">${examResult.examRecord.user.team.teamName}</span>
        </div>
        <div class="col-md-2 text-right">
            ตำแหน่ง :
        </div>
        <div class="col-md-4">
            <span id="position">${examResult.examRecord.user.position.posiName}</span>
        </div>
    </div>
    <hr>
    <h4>ข้อมูลชุดข้อสอบ</h4>

    <div class="row">
        <div class="col-md-2 text-right">ชื่อชุดข้อสอบ :</div>
        <div class="col-md-4">
            <span id="paperName">${examResult.examRecord.paper.name}</span>
        </div>
        <div class="col-md-2 text-right">รหัสชุดข้อสอบ :</div>
        <div class="col-md-4">
            <span id="paperId">${examResult.examRecord.paper.code}</span>
        </div>
    </div>
    <br>

    <div class="row">
        <div class="col-md-2 text-right">คะแนนเต็ม :</div>
        <div class="col-md-4 paperMaxScore">${examResult.examRecord.paper.maxScore}</div>

        <div class="col-md-2 text-right">คะแนนปรนัยที่ได้ :</div>
        <div class="col-md-1 ObjectiveScore">
                ${examResult.objectiveScore}
        </div>
    </div>

    <hr>

    <h4>คำตอบ</h4>

    <div id="marking-body" resultId="${examResult.id}">

        <!---------------------------------------------->
        <c:forEach var="answerRecord" items="${examResult.examRecord.examAnswerRecords}">
            <c:if test="${answerRecord.question.questionType.id == 2}">

                <div class="questionContainer" questionNo="${questionNumber}"
                     questionId="${answerRecord.question.id}"
                     answerRecordId="${answerRecord.id}">
                    <div class="row question-row">
                        <div class="col-md-1 text-right">${questionNumber} :</div>
                        <div class="col-md-10"><span style="font-weight:bold ">คำถาม :</span>
            <span>
                    ${answerRecord.question.description}
            </span>
                        </div>
                    </div>
                    <br>

                    <div class="row answer-row">
                        <div class="col-md-10">
                                <span class="col-md-2 text-right col-md-offset-1"
                                      style="font-weight:bold ">คำตอบ : </span>
                    <textarea class="col-md-8" rows="5" disabled
                              style="resize: none;">${answerRecord.answerSubjective}</textarea>
                        </div>
                    </div>
                    <div class="row ">
                        <div class="col-md-offset-8 col-md-2 text-right"><h5>คะแนน :</h5></div>
                        <div class="col-md-1">
                            <input class="form-control scoreInput"
                                   value="${answerRecord.markingRecord.markingScore}">
                        </div>
                        <div class="col-md-1"><h5>/&nbsp;
                            <c:forEach var="paperQuestion" items="${examResult.examRecord.paper.questions}">

                            <c:if test="${paperQuestion.pk.question.id == answerRecord.question.id}">
                            <span class="maxScore">${paperQuestion.score}</span></h5></div>
                        </c:if>

                        </c:forEach>


                    </div>
                    <hr>
                </div>
                <c:set var="questionNumber" value="${questionNumber+1}"/>

            </c:if>
        </c:forEach>
        <!----------------------------------------------->

    </div>
    <div class="comment-body">
        <h4>แสดงความคิดเห็น</h4>
    <textarea class="form-control" rows="5" id="comment" style="resize: none"
              placeholder="แสดงความคิดเห็น...">${examResult.comment}</textarea>
    </div>
    <br>

    <div class="row">
        <div class="col-md-2 text-right"><h5>คะแนนรวม :</h5></div>
        <div class="col-md-1"><input id="sumScore" class="form-control" disabled
                                     objectiveScore="${examResult.objectiveScore}"
                                     value="${examResult.objectiveScore}"></div>
        <div class="col-md-1">
            <h5>
                <div class="maxScore">/ ${examResult.examRecord.paper.maxScore}</div>
            </h5>
        </div>
        <div class="col-md-offset-4 col-md-2">
            <button class="btn btn-primary submitMarkingBtn <c:if test="${examResult.status.id == 7}">hidden</c:if>"
                    style="width: 100%;" data-toggle="modal"
                    data-target="#submitMarkingModal">ส่งผลตรวจ
            </button>
        </div>
        <div class="col-md-2">
            <button class="btn btn-default cancleMarkingBtn" style="width: 100%;">ยกเลิก</button>
        </div>
    </div>

    <div id="pageTraveller" style="position: fixed; right: 0;bottom: 0;">
        <div id="toTop" class="btn btn-default"><span class="glyphicon glyphicon-upload"></span></div>
        <br>

        <div id="toBottom" class="btn btn-default"><span class="glyphicon glyphicon-download"></span></div>
    </div>

    <div class="modal fade " role="dialog" id="submitMarkingModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body row">
                    <div class="col-md-12 text-center" id="submitMarkingModalMessage">
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
                        <button id="confirmSubmitMarking" class="btn btn-primary" data-dismiss="modal">ส่งผลตรวจ
                        </button>
                        &nbsp;
                        <button id="confirmSubmitMarkingCONFIRM" class="btn btn-warning" data-dismiss="modal">
                            ยืนยันผลตรวจ
                        </button>
                        &nbsp;
                        <button id="cancleSubmitMarking" class="btn btn-danger" data-dismiss="modal">ยกเลิก</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <script src="${context}/resources/js/pageScript/exam/marking.js"></script>
    <style>
        textarea {
            resize: vertical;
        }

        span {
            word-wrap: break-word;
        }
    </style>
</c:if>

<c:if test="${user == null}">
    <div>
        <h1>กรุณาเข้าสู่ระบบก่อนทำการตรวจข้อสอบ</h1>
    </div>
</c:if>