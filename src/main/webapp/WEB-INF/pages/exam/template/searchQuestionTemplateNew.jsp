<%--
  Created by IntelliJ IDEA.
  User: wanchana
  Date: 27/7/2558
  Time: 15:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>

<div class="row">
    <div class="panel-collapse" id="searchCollapse">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h5 class="panel-title">ค้นหา</h5>
            </div>
            <div class="panel-body">
                <%@include file="selectCategoryInput.jsp" %>
                <%@include file="selectCreateByInput.jsp" %>

                <div class="col-sm-9">
                    <div id="showEmployeeSelected" class="col-sm-12 col-sm-offset-2">
                    </div>
                </div>
                <div id="btnSearch">
                    <div class="col-md-12 text-center">
                        <br/>
                        <%--<button id="generalSearchButtonInModalSelectionQuestion" class="btn btn-primary btn-sm searchInputSubmitBtn" type="button">ค้นหา</button>--%>
                        <button id="generalSearchButtonInModalSelectionQuestion" class="btn btn-primary btn-sm searchSubmitBtn" type="button">ค้นหา</button>
                        <button id="resetInputSearchQuestion" class="btn btn-gray btn-sm searchInputClearBtn" type="button">ล้างข้อมูล</button>
                    </div>
                </div>
            </div>
            <div class="panel-footer">
                <div class="row">
                    <div class="col-md-3">
                        <button class="btn btn-primary btn-sm" id="advanceBtn"><span class="glyphicon glyphicon-chevron-down"> ค้นหาขั้นสูง</span></button>
                    </div>
                </div>
                <div id="advanceBody" class="collapse">
                    <br/>
                    <div class="row">
                        <div class="col-sm-2" align="right">
                            <label for="searchQuestionDescInput" class="control-label">คำถาม :</label>
                        </div>
                        <div class="col-md-8 form-group" style="padding: 0;">
                            <input id="searchQuestionDescInput" type="text" class="form-control input-sm" placeholder="ค้นหาคำถาม"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2" align="right">
                            <label for="searchCreateDateFromInput" class="control-label">วันที่สร้าง :</label>
                        </div>
                        <div class="col-md-3 form-group" style="padding: 0;">
                            <div class="input-group">
                                <input id="searchCreateDateFromInput" type="text" class="form-control input-sm datepicker" data-date-format="dd/mm/yyyy" placeholder="  สร้างข้อสอบตั้งแต่วันที่"/>
                                <span class="input-group-addon btn" id="calendarBtnFrom" ><span class="glyphicon glyphicon-calendar" href="#"></span></span>
                            </div>
                        </div>
                        <div class="col-sm-1 col-sm-offset-1" align="right">
                            <label for="searchCreateDateToInput">ถึง :</label>
                        </div>
                        <div class="col-md-3 form-group" style="padding: 0;">
                            <div class="input-group">
                                <input id="searchCreateDateToInput" type="text" class="form-control input-sm datepicker" data-date-format="dd/mm/yyyy" placeholder="  ถึง"/>
                                <span class="input-group-addon btn" id="calendarBtnTo" ><span class="glyphicon glyphicon-calendar" href="#"></span></span>
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
                            <label style="margin-top: 3px;">ยาก :</label>
                        </div>
                        <div class="col-sm-2" style="padding: 0;">
                            <input id="rHard" type="number" class="form-control input-sm" placeholder="จำนวนข้อ"/>
                        </div>
                        <div class="col-sm-1 text-right">
                            <label style="margin-top: 3px;">ปานกลาง</label>
                        </div>
                        <div class="col-sm-2" style="padding: 0;">
                            <input id="rNormal" type="number" class="form-control input-sm" placeholder="จำนวนข้อ"/>
                        </div>
                        <div class="col-sm-1 text-right">
                            <label style="margin-top: 3px;">ง่าย</label>
                        </div>
                        <div class="col-sm-2" style="padding: 0;">
                            <input id="rEasy" type="number" class="form-control input-sm" placeholder="จำนวนข้อ"/>
                        </div>
                    </div>
                    <div class="row" id="btnAdvanceSearch">
                        <div class="col-md-12 text-center">
                            <hr/>
                            <button id="advSearchBtn" class="btn btn-primary btn-sm searchSubmitBtn" type="button">ค้นหา</button>
                            <button id="advResetBtn" class="btn btn-gray btn-sm searchInputClearBtn" type="button">ล้างข้อมูล</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="${context}/resources/js/pageScript/exam/searchQuestionTemplate.js" charset="UTF-8"></script>
<script>
    $("#searchCreateDateFromInput").datepicker().on('changeDate', function(){
        $("#searchCreateDateFromInput").datepicker('hide');
    });
    $("#searchCreateDateToInput").datepicker().on('changeDate', function(){
        $("#searchCreateDateToInput").datepicker('hide');
    });
</script>
