<%--
  Created by IntelliJ IDEA.
  User: wanchana
  Date: 27/7/2558
  Time: 15:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="../modal/addEmployeeToInputModal.jsp" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>

<div class="panel-collapse" id="searchCollapse">
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h5 class="panel-title">ค้นหาชุดข้อสอบ</h5>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-sm-2 text-right">
                    <label>รหัสชุดข้อสอบ :</label>
                </div>
                <div class="col-md-3 form-group" style="padding: 0;">
                    <input id="paperCodeSearch" type="text" class="form-control input-sm" placeholder="รหัสชุดข้อสอบ"/>
                </div>
                <div class="col-sm-2" align="right">
                    <label for="searchScoreToInput">ชื่อชุดข้อสอบ :</label>
                </div>
                <div class="col-md-3 form-group" style="padding: 0;">
                    <input id="paperName" type="text" class="form-control input-sm" placeholder="ชื่อชุดข้อสอบ"/>
                </div>
            </div>
            <div class="row">
                <%@include file="selectCreateByInput.jsp" %>
            </div>
            <%--<div class="row">--%>
                <%--<div class="col-sm-8 col-sm-offset-2">--%>
                    <%--<div id="showEmployeeSelected" style="padding: 0; margin: 0;">--%>

                    <%--</div>--%>
                <%--</div>--%>
            <%--</div>--%>
            <br/>
            <div class="row">
                <div class="col-md-12 text-center">
                    <button id="searchPaper" class="btn btn-primary btn-sm" type="button">ค้นหา</button>
                    <button id="resetSearchPaper" class="btn btn-gray btn-sm" type="button">ล้างข้อมูล</button>
                </div>
            </div>
        </div>
        <div class="panel-footer">
            <div class="row">
                <div class="col-md-3">
                    <button class="btn btn-primary btn-sm" id="advanceBtn"><span
                            class="glyphicon glyphicon-chevron-down"> ค้นหาขั้นสูง</span></button>
                </div>
            </div>
            <div id="advanceBody" class="collapse">
                <br/>
                <div class="row">
                    <div class="col-sm-2" align="right">
                        <label for="searchCreateDateFromInput" class="control-label">วันที่สร้าง :</label>
                    </div>
                    <div class="col-md-3 form-group" style="padding: 0;">
                        <div class="input-group">
                            <input id="searchCreateDateFromInput" type="text" class="form-control input-sm datepicker" data-date-format="dd/mm/yyyy" placeholder="  สร้างชุดข้อสอบตั้งแต่วันที่"/>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar" href="#"></span></span>
                        </div>
                    </div>
                    <div class="col-sm-1 col-sm-offset-1" align="right">
                        <label for="searchCreateDateToInput">ถึง :</label>
                    </div>
                    <div class="col-md-3 form-group" style="padding: 0;">
                        <div class="input-group">
                            <input id="searchCreateDateToInput" type="text" class="form-control input-sm datepicker" data-date-format="dd/mm/yyyy" placeholder="  ถึง"/>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar" href="#"></span></span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-2" align="right">
                        <label>คะแนน :</label>
                    </div>
                    <div class="col-md-3 form-group" style="padding: 0;">
                        <input id="searchScoreFromInput" type="text" class="form-control input-sm" placeholder="คะแนนตั้งแต่"/>
                    </div>
                    <div class="col-sm-1 col-sm-offset-1" align="right">
                        <label for="searchScoreToInput">ถึง :</label>
                    </div>
                    <div class="col-md-3 form-group" style="padding: 0;">
                        <input id="searchScoreToInput" type="text" class="form-control input-sm" placeholder="ถึง"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-2" align="right">
                        <label>สถานะ :</label>
                    </div>
                    <div class="col-md-3 form-group" style="padding: 0;">
                        <select id="searchPaperStatus" class="form-control input-sm">
                            <option value="0" selected>เลือกสถานะ</option>
                            <option value="1" >เปิดใช้งาน</option>
                            <option value="2" >ปิดใช้งาน</option>
                            <%--<option value="3" >ยังไม่เผยแพร่</option>--%>
                        </select>
                    </div>
                </div>
                <div class="row form-group">
                    <div id="btnAdvanceSearch">
                        <div class="col-md-12 text-center">
                            <%--<hr/>--%>
                            <button id="advPaperSearchBtn" class="btn btn-primary btn-sm" type="button">ค้นหา
                            </button>
                            <button id="advPaperResetBtn" class="btn btn-gray btn-sm searchInputClearBtn"
                                    type="button">ล้างข้อมูล
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    $(document).ready(function () {
        $("#advanceBtn").click(function () {
            var str = $("#search").prop('outerHTML') + "&nbsp" + $("#clear").prop('outerHTML');
            $("#advanceBody").collapse('toggle');
            if ($("#advanceBtn").children("span").hasClass("glyphicon glyphicon-chevron-down")) {
                $("#advanceBtn").children("span").removeClass("glyphicon glyphicon-chevron-down").addClass("glyphicon glyphicon-chevron-up");
                $("#searchPaper").hide();
                $("#resetSearchPaper").hide();
                $("#btnSearch").hide();
                $("#btnAdvanceSearch").show();
            }
            else {
                $("#advanceBtn").children("span").removeClass("glyphicon glyphicon-chevron-up").addClass("glyphicon glyphicon-chevron-down");
                $("#btnSearch").show();
                $("#btnAdvanceSearch").hide();
                $("#searchPaper").show();
                $("#resetSearchPaper").show();
            }
        });

        $(".datepicker").datepicker();

        $("#searchCreateDateFromInput").datepicker().on('changeDate', function(){
            $("#searchCreateDateFromInput").datepicker('hide');
        });
        $("#searchCreateDateToInput").datepicker().on('changeDate', function(){
            $("#searchCreateDateToInput").datepicker('hide');
        });
    });
</script>
