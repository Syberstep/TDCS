<%--
  Created by IntelliJ IDEA.
  User: PTang_000
  Date: 7/17/2015
  Time: 3:14 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<style>
    #randomQuestionModal{
        overflow-y: auto;
    }
</style>

<!-- Modal -->
<div class="modal fade" id="randomQuestionModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <button type="button" class="close"aria-label="Close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                <div class="container">
                    <div class="row">
                        <h4>สุ่มข้อสอบ</h4>
                        <hr>
                    </div>
                    <div class="row">
                        <h4>ระดับ</h4>
                        <div class="col-sm-2 col-sm-offset-3 text-right">
                            <label>ยาก :</label>
                        </div>
                        <div class="col-sm-3" style="padding: 0;">
                            <input id="randHard" type="number" class="form-control input-sm" placeholder="จำนวนข้อ"/>
                        </div>
                    </div><br/>
                    <div class="row">
                        <div class="col-sm-2 col-sm-offset-3 text-right">
                            <label>ปานกลาง :</label>
                        </div>
                        <div class="col-sm-3" style="padding: 0;">
                            <input id="randNormal" type="number" class="form-control input-sm" placeholder="จำนวนข้อ"/>
                        </div>
                    </div><br/>
                    <div class="row">
                        <div class="col-sm-2 col-sm-offset-3 text-right">
                            <label>ง่าย :</label>
                        </div>
                        <div class="col-sm-3" style="padding: 0;">
                            <input id="randEasy" type="number" class="form-control input-sm" placeholder="จำนวนข้อ"/>
                        </div>
                    </div>
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
