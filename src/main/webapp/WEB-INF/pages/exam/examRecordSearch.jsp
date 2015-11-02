<%--
  Created by IntelliJ IDEA.
  User: PTang_000
  Date: 7/16/2015
  Time: 10:18 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>

<script>
    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
</script>
<style>
    #paperNotFound {
        background-color: #b2e0ff;
        height: 100px;
        display: none;
        top: 40px;
        vertical-align: middle;
        border-radius: 5px;
        margin-top: -15px;
    }
    #paperNotFoundDesc {
        text-align: center;
        vertical-align: middle;
        line-height: 100px;
        color: #00647f;
    }
</style>

<h3>ตรวจข้อสอบ</h3>
<hr>


<div>
    <div class="panel panel-primary">
        <div class="panel-heading"><h5 class="panel-title">ค้นหา</h5></div>
        <div class="panel-body">
            <div class="form-horizontal">
                <div class="row">
                    <div class="col-sm-6">
                        <label class="col-sm-4 control-label ">ชุดข้อสอบ :</label>

                        <div class="col-sm-6 input-group">
                            <input id="searchPaperInput" class="form-control">
                                    <span class="input-group-addon">
                                        <i class="glyphicon glyphicon-search" style="cursor: pointer; height: 20px;"
                                           onclick="listSearchPaper()"></i>
                                    </span>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <label class="col-sm-3 control-label " style="text-align: left">ชื่อนักศึกษา :</label>
                        <div class="col-md-6 input-group ">
                            <input id="searchNameTrainee" class="form-control" >
                                    <span class="input-group-addon" >
                                        <i class="glyphicon glyphicon-search" style="cursor: pointer; height: 20px;"
                                           onclick="listNameTrainee()"></i>
                                    </span>
                        </div>
                    </div>

                </div>
                <div class="row" style="margin: 15px 0 0 9px">
                        <%@include file="template/selectCreateByInput.jsp" %>

                    <div class="col-sm-6">
                        <label class="col-sm-3 control-label " style="text-align: right; margin-left: 16px">ตำแหน่ง :</label>
                        <div class="col-sm-6 input-group">
                            <select id="forPosition" class="form-control"style="margin-left: 14px;width: 105%">
                                <option value="0">ทั้งหมด</option>
                                <option value="1">Software Developer Trainee</option>
                                <option value="2">Assistant Business Analyst</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-md-offset-1" id="showEmployeeSelected" width="100%; ">

                </div>

            </div>
        </div>
        <div class="panel-footer">
            <div class="row">
                <div class="row" id="btnSearch">
                    <div class="col-md-12 text-center">
                        <button id="btnExamRecordSearch" class="btn btn-primary btn btn-sm" type="button">ค้นหา</button>
                        <button id="btnExamRecordSearchClearInput" class="btn btn-default btn btn-sm" type="button"
                                style="background-color: rgba(193, 193, 198, 0.83); color: #000000;">ล้างข้อมูล
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div>
    <div class="row">
        <div class="col-md-12">
            <table id="tbExamRecordSearch" class="table table-bordered table-responsive table-hover">
                <thead class="bg-primary small">
                <tr>
                    <th class="text-center">รหัสชุดข้อสอบ</th>
                    <th class="text-center">ชื่อชุดข้อสอบ</th>
                    <th class="text-center">ชื่อผู้สอบ</th>
                    <th class="text-center">ตำแหน่ง</th>
                    <th class="text-center">คะแนนสอบ</th>
                    <%--<th class="text-center">คะแนนPost-Test</th>--%>
                    <th class="text-center">คะเเนนเต็ม</th>
                    <th class="text-center">สร้างโดย</th>
                    <th class="text-center">สถานะ</th>
                    <%--<th class="text-center">Review</th>--%>
                </tr>
                </thead>

                <!---------------------------------------------------- Generate Table --------------------------------------------------------------------------------->
                <tbody id="tbodyExamRecord">
                </tbody>
                <div id="paperNotFound" width="100%">
                    <h3 id="paperNotFoundDesc">ไม่พบชุดข้อสอบ</h3>
                </div>
            </table>
        </div>
    </div>
</div>
</div>
</div>
<%-----------------------------------------------confirm modal------------------------------------------- --%>
<!-- alertModal-->
<div id="alertModalChangPage" class="modal fade">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <center>
                    <label><h4>ตรวจข้อสอบ</h4></label>
                </center>
            </div>
            <div class="modal-footer border">
                <center>
                    <button id="okBtnChangPage" class="btn btn-sm btn-primary" data-dismiss="modal">ตกลง
                    </button>
                    <button id="cancleBtnChangPage" class="btn btn-sm btn-danger"
                            data-dismiss="modal">ยกเลิก
                    </button>
                </center>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<%-----------------------------------------------confirm modal------------------------------------------- --%>
<!-- alertModal-->
<%--<div id="alertModalRemark" class="modal fade">--%>
    <%--<div class="modal-dialog modal-sm">--%>
        <%--<div class="modal-content">--%>
            <%--<div class="modal-header">--%>
                <%--<center>--%>
                    <%--<label><h4>ตรวจข้อสอบซ้ำ</h4></label>--%>
                <%--</center>--%>
            <%--</div>--%>
            <%--<div class="modal-footer border">--%>
                <%--<center>--%>
                    <%--<button id="testResultBtn" class="btn btn-sm btn-primary" data-dismiss="modal" >Pre-test--%>
                    <%--</button>--%>
                    <%--<button id="cancleBtn" class="btn btn-sm btn-danger"--%>
                            <%--data-dismiss="modal">ยกเลิก--%>
                    <%--</button>--%>
                <%--</center>--%>
            <%--</div>--%>
        <%--</div>--%>
        <%--<!-- /.modal-content -->--%>
    <%--</div>--%>
    <%--<!-- /.modal-dialog -->--%>
<%--</div>--%>
<%--<!-- /.modal -->--%>
<%@include file="modal/addEmployeeToInputModal.jsp" %>
<script type="text/javascript" src="<c:url value="/resources/js/pageScript/exam/examRecordSearch.js" />"></script>
<%--end class row--%>