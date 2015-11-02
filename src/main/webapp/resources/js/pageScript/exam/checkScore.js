/**
 * Created by Phuthikorn_T on 14/10/2558.
 */

$('.resultDetail').on('click',function(){
    var resultId = $(this).attr('resultId');
    updateResultDetail(resultId)
})

var updateResultDetail = function(resultId){
    $.ajax({
        type:"POST",
        url:context+'/TDCS/exam/checkScore/getResultDetail',
        data:{
            resultId:resultId
        },
        success:function(res){
            clearDetailModal()
            if(res != null) {
                $('#objectiveShowScore').text(res.objectiveScore);
                $('#subjectiveShowScore').text(res.subjectiveScore);
                $('#commentTextArea').val(res.comment);
                $('#markedByShow').text(res.markedBy.thFname + " " + res.markedBy.thLname);
                var sumScoreShowText = "คะแนนที่ได้ = " + (parseFloat(res.objectiveScore) + parseFloat(res.subjectiveScore)) + " / " + res.examRecord.paper.maxScore
                $('#sumScoreShow').text(sumScoreShowText);
            }else{
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
    $('#objectiveShowScore').text("");
    $('#subjectiveShowScore').text("");
    $('#commentTextArea').val("");
    $('#markedByShow').text("");
    $('#sumScoreShow').text("");
}