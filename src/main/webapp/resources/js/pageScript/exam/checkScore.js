/**
 * Created by Phuthikorn_T on 14/10/2558.
 */

$('.resultDetail').on('click',function(){
    $('#alertModalResult').modal('show');
    var resultId = $(this).attr('resultId');
    updateResultDetail(resultId)
})
var i;
var updateResultDetail = function(resultId){
    $.ajax({
        type:"POST",
        url:context+'/TDCS/exam/checkScore/getResultDetail2',
        data:{
            resultId:resultId
        },
        success:function(res){
            clearDetailModal()
            if(res.size != 0) {
               //for(i=0; i<res[0].examRecord.examAnswerRecords.length;i++){
               //    $("#tbodyCheckScore").append(
               //        '<tr>' +
               //        '<td><label >'+res[0].examRecord.examAnswerRecords[i].question.subCategory.category.name+'</label></td>' +
               //        '<td><label >'+res[0].examRecord.examAnswerRecords[i].question.subCategory.name+'</label></td>' +
               //        '<td><label >vxcv</label></td>' +
               //        '<td><label >vxcvc</label></td>' +
               //        '</tr>'
               //    );
               //}
            }
            else{
                $('#showScore').modal('hide')
                alert('ไม่มีบันทึกการตรวจข้อสอบ')
            }

        },
        error:function(){
            alert('error occur')
            $('#showScore').modal('hide')
        }
    })
}

var clearDetailModal = function(){
    $('#tbodyCheckScore').text("");
}