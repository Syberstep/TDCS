<%--<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>--%>
<%--
  Created by IntelliJ IDEA.
  User: wanchana
  Date: 16/7/2558
  Time: 15:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!-- Modal Search Advance -->
<style>
  #dataNotFound{
    background-color: #b2e0ff;
    height: 100px;
    display: none;
    top: 40px;
    vertical-align: middle;
    border-radius: 5px;
  }
  #dataNotFoundDesc{
    text-align: center;
    vertical-align: middle;
    line-height: 100px;
    color: #00647f;
  }
</style>

<div id = "modalSearchByEmployeeName" class = "modal fade" role = "dialog">
  <div class = "modal-dialog">
    <div class = "modal-content">
      <div class = "modal-header">
        <button class = "close modalSearchByEmployeeNameCloseBtn" type = "close">&times;</button>
        <h4 class = "modal-title">ค้นหาพนักงาน</h4>
      </div>
      <div class = "modal-body" align = "center">
        <div class = "row">
          <div class = "col-md-8 col-md-offset-2">
            <%--<form class = "form-inline" role = "form">--%>
              <div class = "row">
                <div class="col-md-offset-1 col-md-1" align="right"><h5>ชื่อ</h5></div>
                <%--<label>ชื่อ</label>--%>
                <div class="col-md-6">
                  <input id="searchEmployeeNameText" class = "form-control input-sm" type = "text" placeholder="ค้นหาพนักงาน"/>
                </div>
                <div class="col-md-1">
                  <button id="searchBtnFromModalSearchEmployee" class = "btn btn-primary btn-sm" type="submit">ค้นหา</button>
                </div>
              </div>
            <%--</form>--%>
          </div>
        </div>
        <br/>
        <div class = "row">
          <div class = "col-md-12" align = "center">
            <table class = "table table-bordered">
              <thead>
                <tr>
                  <th style="text-align: center;"><input id="selectAllEmployeeName" type="checkbox" style="display: none;"/></th>
                  <th style="text-align: center;">รหัสพนักงาน</th>
                  <th style="text-align: center;">ชื่อพนักงาน</th>
                  <th style="text-align: center;">ตำแหน่ง</th>
                  <th style="text-align: center;">ทีม</th>
                </tr>
              </thead>
              <tbody id="tbodySelectEmployeeName">

              </tbody>
            </table>
            <div id="dataNotFound" width="100%">
              <h3 id="dataNotFoundDesc">ไม่พบข้อมูล</h3>
            </div>
          </div>
        </div>
        <br/>
        <div class = "row">
          <div class = "col-md-12" align="right">
            <div class = "form-group">
              <button id="addEmployeeBtn" class = "btn btn-default modalSearchByEmployeeNameSubmitBtn btn-sm">เพิ่ม</button>
              <button class = "btn btn-gray modalSearchByEmployeeNameCloseBtn btn-sm">ยกเลิก</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<%--<script>--%>

  <%--$('.modalSearchByEmployeeNameSubmitBtn').on('click',function(){--%>
    <%--// DO SOMETHING//--%>

    <%--// FINISH //--%>
    <%--$("#modalSearchByEmployeeName").modal("hide");--%>
  <%--});--%>

  <%--$('.modalSearchByEmployeeNameCloseBtn').on('click',function(){--%>
    <%--$("#modalSearchByEmployeeName").modal("hide");--%>
  <%--});--%>

  <%--$('#searchBtnFromModalSearchEmployee').on('click', function () {--%>
    <%--searchEmpName();--%>
  <%--});--%>

  <%--$("#addEmployeeBtn").on('click', function(){--%>
    <%--addEmployee();--%>
  <%--});--%>


  <%--$("#addMarkerEmpIdBtn").on('click', function(){--%>
    <%--addEmployee();--%>
  <%--});--%>



<%--</script>--%>