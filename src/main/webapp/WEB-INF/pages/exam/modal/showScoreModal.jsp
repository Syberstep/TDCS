<%--
  Created by IntelliJ IDEA.
  User: JOKIZZ
  Date: 29/7/2558
  Time: 15:42
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--Modal Check Score--%>
<div class="modal fade" id="showScore">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">

        <div class="modal-body">
          <div class="row">
            <button class = "close showScoreCloseBtn" type = "close">&times;</button>
            <div class="col-md-6 col-md-offset-3">

              <h3 style="text-align: center" id="sumScoreShow"></h3>
            </div>
          </div>
          <hr>
          <br>
          <div class="row">
            <div class="col-md-3 col-md-offset-3">
              <label><h4>ปรนัย</h4></label>
            </div>

            <div class="col-md-3 col-md-offset-1">
              <label><h4 id="objectiveShowScore"></h4></label>
            </div>
          </div>

          <div class="row">
            <div class="col-md-3 col-md-offset-3">
              <label><h4>อัตนัย</h4></label>
            </div>

            <div class="col-md-3 col-md-offset-1">
              <label><h4 id="subjectiveShowScore"></h4></label>
            </div>
          </div>
        </div>

        <hr>

        <div class="row">
          <div class="col-md-3 text-right">
            <h5>ความคิดเห็น :</h5>
          </div>

          <div >
            <div class=" col-md-7">
              <textarea id="commentTextArea" class="form-control" rows="5" disabled
                        style="resize: none; background-color: #FFFFFF;"></textarea>
            </div>
          </div>

          <div class="row">
            <div class="col-md-2 col-md-offset-6 text-right">
              <h5>ตรวจโดย :</h5>
            </div>
            <div class="col-md-4">
              <h5 id="markedByShow"></h5>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->
<!-- End Modal Check Score -->

<script>

  $('.showScoreCloseBtn').on('click',function(){
    $("#showScore").modal("hide");
  })

  $('#objectiveShowScore').text

</script>