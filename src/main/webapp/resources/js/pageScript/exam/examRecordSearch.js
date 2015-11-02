/**
 * Created by Jobz on 6/10/2558.
 */
$(document).ready(function(){
    searchExampaper();
});
$("#btnExamRecordSearch").on('click',function() {
    searchExampaper();
});
$("#btnExamRecordSearchClearInput").on('click',function(){
    clearInput();
});
function clearInput(){
    $("#searchPaperInput").val("");
    $("#forPosition").val(0);
    $("#showEmployeeSelected").empty();
    $('#searchNameTrainee').val("");
}
var itemLenght;
var code;
var position;
var traineeNameEmpId;
var arrayItemToQuery = new Array();
var tempArray = new Array();
var jsonObj = {};
function searchExampaper(){
    itemLenght = ($("#showEmployeeSelected").children("button")).length;
    code = $("#searchPaperInput").val();
    position = $("#forPosition").val();
    code = code.substr(0, code.indexOf(' '));
    traineeNameEmpId = $('#searchNameTrainee').val();
    traineeNameEmpId = traineeNameEmpId.substr(0, traineeNameEmpId.indexOf(':'));
    if(itemLenght > 0) {
        for (i = 0; i < itemLenght; i++) {
            var temp = $("#showEmployeeSelected").children("button")[i].innerHTML;
            temp = temp.substring(temp.indexOf('_') + 1, temp.indexOf('z'));
            arrayItemToQuery.push(temp);

        }
    }
    for (var idx = 0; idx < arrayItemToQuery.length; idx++) {
        var items = {
            userId: arrayItemToQuery[idx]
        }
        tempArray.push(items);
    }
    var a = {
        code: code,
        position : position,
        empId : traineeNameEmpId
    }
    tempArray.push(a);
    arrayItemToQuery= [];

    jsonObj = JSON.stringify(tempArray);
    //alert(jsonObj);
    var dataResponse = $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/getQueryExamRecordSearch",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            Accept: "application/json"
        },
        async: false,
        data: jsonObj,
        success: function(data){
            $("#tbodyExamRecord").empty();
            if(data.length == 0){
                $("#paperNotFound").show();
                $('#tbExamRecordSearch').hide();
            //alert("ไม่พบข้อมูล");
            }
            //data.forEach(function(value){
            var indexTestResult = 0;
            for(var i = 0; i < data.length; i ++){
                $("#paperNotFound").hide();
                $('#tbExamRecordSearch').show();
                var testResult;
                testResult =  Number(data[i].objectiveScore)+ Number (data[i].subjectiveScore);
                    if (data[i].examRecord.user.position.posiName == "Software Developer Trainee") {
                        data[i].examRecord.user.position.posiName = "Dev";
                    }
                    if (data[i].examRecord.user.position.posiName == "Assistant Business Analyst") {
                        data[i].examRecord.user.position.posiName = "BA";
                    }

                    $("#tbodyExamRecord").append(
                        '<tr>' +
                        '<td class="text-center"><label >' + data[i].examRecord.paper.code + '</label></td>' +
                        '<td><label >' + data[i].examRecord.paper.name + '</label></td>' +
                        '<td><label >' + data[i].examRecord.user.thFname + "    " + data[i].examRecord.user.thLname + '</label></td>' +
                        '<td class="text-center"><label >' + data[i].examRecord.user.position.posiName + '</label></td>' +
                        '<td class="text-center" resultId="' + data[i].id + '"><label ></label></td>' +
                        '<td class="text-center">' + data[i].examRecord.paper.maxScore + '</td>' +
                        '<td><label >' + data[i].examRecord.paper.createBy.thFname + '</label></td>' +
                        '<td class="text-center"><label >' + data[i].status.description + '</label></td>' +
                        //'<td class="text-center"></td>' +
                        '</tr>'
                    );
                    if (data[i].status.id != 6 && data[i].status.id != 7) {
                        //$("#tbodyExamRecord").children('tr:eq(' + (indexTestResult) + ')').children('td:eq(7)').html('<button onclick="markBtn(this)" class="btn btn-warning btn btn-sm" type="button">รอตรวจ</button>');
                        indexTestResult++;
                    } else {
                        $("#tbodyExamRecord").children('tr:eq('+(indexTestResult)+')').children('td:eq(4)').html(testResult);
                        //$("#tbodyExamRecord").children('tr:eq('+(indexTestResult)+')').children('td:eq(8)').html('<button onclick="remarkBtn(this)" class="btn btn-success btn btn-sm" type="button">click</button>');
                        indexTestResult++;
                    }
            }
        },
        error: function(){
            alert("error");
        }
    });
    arrayItemToQuery = [];
    tempArray = [];

    $("#searchPaperInput").keyup(function(e) {
        if (e.which > 0) {
            e.preventDefault();
            listSearchPaper();
        }
    });
}

var tbodytrResuiltId;
//function markBtn(element) {
//    $("#alertModalChangPage").modal("show");
//    tbodytrResuiltId=element.parentNode.parentNode.children[4].getAttribute('resultId');
//}
//$("#okBtnChangPage").on("click",function(){
//    location.href = "/TDCS/exam/marking?resultId="+ tbodytrResuiltId;
//});

var testResultId;
//function remarkBtn(element) {
//
//    $('#testResultBtn').prop( "disabled", true );
//    $("#alertModalRemark").modal("show");
//    testResultId=element.parentNode.parentNode.children[4].getAttribute('resultId');
//    if(testResultId!="" ){
//        $('#testResultBtn').prop( "disabled", false );
//    }
//}
//$("#testResultBtn").on("click",function(){
//    location.href = "/TDCS/exam/marking?resultId="+ testResultId;
//});

$('#tbodyExamRecord').on('click','tr',function(){
    $('#alertModalChangPage').modal('show');
    tbodytrResuiltId = $(this).children('td:eq(4)').attr('resultId') ;
});
$("#okBtnChangPage").on("click",function(){
    location.href = "/TDCS/exam/marking?resultId="+ tbodytrResuiltId;
});

function listSearchPaper() {
    var availableall = [];

    var data = $.ajax({
        type: "POST",
        contentType: "application/json",
        url: context+"/TDCS/exam/getAllPapers",
        async: false,
        success: function (data) {

            data.forEach(function (value) {
                availableall.push(value.code + ' : ' + value.name);
            });
        },
        error: function (data) {
            alert('error while request...');
        }
    });

    var search = $("#searchPaperInput").val();
    $("#searchPaperInput").typeahead('destroy').typeahead({
        source: availableall,
        minLength: 0,
        items: 20
    }).focus().val('').keyup().val(search);
}

function listNameTrainee(){
    var listAllNameTrainee = [];

    var data = $.ajax({
        type: "POST",
        contentType: "application/json",
        url: context+"/TDCS/exam/getAllUserTrainee",
        async: false,
        success: function (data) {

            data.forEach(function (value) {
                listAllNameTrainee.push(value.empId+':'+value.thFname + '  ' + value.thLname);
            });
        },
        error: function (data) {
            alert('error while request...');
        }

    });

    var search = $("#searchNameTrainee").val();
    $("#searchNameTrainee").typeahead('destroy').typeahead({
        source: listAllNameTrainee,
        minLength: 0,
        items: 20
    }).focus().val('').keyup().val(search);

}