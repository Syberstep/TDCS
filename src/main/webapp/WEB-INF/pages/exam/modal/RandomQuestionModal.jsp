<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!-- Modal -->
<div class="modal fade" id="randomQuestionModal">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body" width="100%">
                <button type="button" class="close"aria-label="Close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                <div class="container">
                    <div class="row">
                        <h4>สุ่มข้อสอบ</h4>
                        <hr>
                    </div>
                    <div class="row">
                        <%@include file="/WEB-INF/pages/exam/template/selectCategoryInputRandom.jsp" %>
                    </div>
                    <div class="row">
                        <div class="row col-sm-6">
                            <div class="col-sm-4  text-right">
                                <h5 style="margin-top: 5px;">ระดับ :</h5>
                            </div>
                            <div class="col-sm-2 text-right">
                                <label style="margin-top: 3px;">ยาก :</label>
                            </div>
                            <div class="col-sm-3" style="padding: 0;">
                                <input id="randomHard" type="number" class="form-control input-sm" placeholder="จำนวนข้อ"/>
                            </div>
                            <div class="col-sm-3 text-right">
                                <label style="margin-top: 3px;">ปานกลาง :</label>
                            </div>
                        </div>
                        <div class="row col-sm-6">
                            <div class="col-sm-3" style="padding: 0;">
                                <input id="randomNormal" type="number" class="form-control input-sm" placeholder="จำนวนข้อ"/>
                            </div>
                            <div class="col-sm-2 text-right">
                                <label style="margin-top: 3px;">ง่าย :</label>
                            </div>
                            <div class="col-sm-3" style="padding: 0;">
                                <input id="randomEasy" type="number" class="form-control input-sm" placeholder="จำนวนข้อ"/>
                            </div>
                        </div>
                    </div><br/>
                    <div class="row">
                        <div class="col-sm-12 text-center">
                            <hr/>
                            <button id="randBtn" class="btn btn-primary btn-sm" type="button" data-dismiss = "modal">สุ่มผลลัพธ์</button>
                            <button id="randResetBtn" class="btn btn-gray btn-sm searchInputClearBtn" type="button">ล้างข้อมูล</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
