<%--By Jokkiz--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>

<div class="row col-sm-6">
    <div class="col-sm-4  text-right">
        <h5>หมวดหมู่ :</h5>
    </div>

    <div class="col-sm-6 input-group">
        <input type="text" class="form-control" name="cat" id="selectCategoryToSelectionForRandom" placeholder="ค้นหาหมวดหมู่" autocomplete="off"/>

        <span class="input-group-addon" id="selectCatForRandom">
        <i class="glyphicon glyphicon-search" onclick="listcatSelectInputForRandom()" style="cursor: pointer; height: 20px;"></i>
        </span>
    </div>
</div>
<div class="col-sm-6">
    <div class="col-sm-3 text-right">
        <h5>หัวข้อเรื่อง :</h5>
    </div>
    <div class="col-sm-6 form-group" style="padding: 0;">
        <select id="selectSubCategoryToSelectionForRandom" class="form-control" data-width="100%">
        </select>
    </div>
</div>
<script src="${context}/resources/js/pageScript/exam/selectCategoryInputRandom.js" charset="utf-8"></script>