<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: PTang_000
  Date: 7/17/2015
  Time: 4:11 PM
  To change this template use File | Settings | File Templates.
--%>

<!-- Slect Category and Sub Category (หมวดหมู่ และ หัวข้อเรื่อง)-->
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>

<div class="row col-sm-6">
    <div class="col-sm-4  text-right">
        <h5>หมวดหมู่ :</h5>
    </div>

    <div class="col-sm-6 input-group">
        <input type="text" class="form-control" name="cat" id="selectCategoryToSelection" placeholder="ค้นหาหมวดหมู่" autocomplete="off"/>

        <span class="input-group-addon btn" id="selectCat">
        <i class="glyphicon glyphicon-search" onclick="listcatSelectInput()" style="cursor: pointer; height: 20px;"></i>
        </span>
    </div>
</div>
<div class="col-sm-6">
    <div class="col-sm-3 text-right">
        <h5>หัวข้อเรื่อง :</h5>
    </div>
    <div class="col-sm-6 form-group" style="padding: 0;">
        <select id="selectSubCategoryToSelection" class="form-control" data-width="100%">
        </select>
    </div>
</div>
<script src="../../../resources/js/pageScript/exam/selectCategoryInput.js" charset="utf-8"></script>