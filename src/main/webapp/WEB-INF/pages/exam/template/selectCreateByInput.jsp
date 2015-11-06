<%--
  Created by IntelliJ IDEA.
  User: PeeMz
  Date: 17/7/2558
  Time: 16:34
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="context" value="${pageContext.request.contextPath}"/>
<script>
    var context = '${context}';
</script>
    <%--Add By Mr.Wanchana--%>
    <div class="col-sm-2 text-right">
        <label for="addEmpCreateByBtn" class="label-control"><h5 style="margin-top: 5px">สร้างโดย :</h5></label>
    </div>
    <div class="col-sm-8" style="padding: 0;">
        <button data-toggle="modal" data-target="#modalSearchByEmployeeName" class="btn btn-success btn-sm" id="addEmpCreateByBtn">
            <span class="glyphicon glyphicon-plus"></span>
        </button>
        <div id="showEmployeeSelected" style="padding: 0; margin: 0;">

        </div>
    </div>

<%@include file="../modal/addEmployeeToInputModal.jsp" %>
<script src="${context}/resources/js/pageScript/exam/selectEmployee.js" ></script>
<script src="${context}/resources/js/pageScript/exam/selectCreateByInput.js"></script>
<script>
    $(document).ready(function () {
        $("#selectAllEmployeeName").click(function (event) {
            if (this.checked) {
                $(".userSelectCheckbox").each(function () {
                    this.checked = true;
                });
            }
            else {
                $(".userSelectCheckbox").each(function () {
                    this.checked = false;
                });
            }
        })
    });
</script>

