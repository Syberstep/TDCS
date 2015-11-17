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
            var maxScore =0 ;
            if(res.size != 0) {
                for(i=0; i<res.length;i++){
                    maxScore += res[i].subCategoryMaxScore;
                    $("#tbodyCheckScore").append(
                       '<tr>' +
                       '<td><label >'+res[i].categoryName+'</label></td>' +
                       '<td><label >'+res[i].subCategoryName+'</label></td>' +
                       '<td class="text-center"><label >'+res[i].subCategoryMaxScore+'</label></td>' +
                       '<td class="text-center"><label >'+res[i].subCategoryResultScore+'</label></td>' +
                       '</tr>'
                   );
                }
            }
            else{
                $('#showScore').modal('hide')
                alert('ไม่มีบันทึกการตรวจข้อสอบ')
            }
            var resultScore = res[0].subjectiveScore + res[0].objectiveScore;
            $('#forObjScore').html('<pre class="col-sm-2 form-control">'+res[0].objectiveScore );
            $('#forsjScore').html('<pre class="col-sm-2 form-control">'+res[0].subjectiveScore );
            $('#forSumScore').html('<pre class="col-sm-2 form-control">'+resultScore);
            $('#forMaxScore').html('<pre class="col-sm-2 form-control">'+maxScore );
            $('#commentTextArea').html(res[0].comment);
            $('#markedByShow').html(res[0].markedBy);
            $('.txtScore').text('คะแนน');

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