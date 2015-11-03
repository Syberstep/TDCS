var pId;
var itemLenght;
var code;
var name;
var arrayEmployeeToSearch = new Array();
var createDateFrom;
var createDateTo;
var scoreFrom;
var scoreTo;
var paperStatus;
var btnSearchStatus;
var tempArray = new Array();
var paperIdArray = new Array();

$(document).ready(function(){

    getAllPapers();

    if($("#tbodyManagePaper tr").length == 0){
        paperNotFound();
    }

    $("#advPaperResetBtn").unbind('click').click(function(){
        resetAdvInput();
    });

    $("#resetSearchPaper").unbind('click').click(function(){
        resetInput();
    });

    $('#tbodyManagePaper tr').mouseover(function(){
        $(this).css('cursor', 'pointer');
    });

    $('#tbodyManagePaper').on('click','td:not(.pCheck):not(.pSelect):not(.pButton)',function(){
        var paperId = $(this).parent().find("button").attr('id');
        pId = $(this).parent().siblings().map(function(){
            return $(this).text();
        }).get(0);
        window.location.href = context+"/TDCS/exam/createPaper?pId="+paperId+"#info";
    });

    $("#searchPaperStatus").on('change', function(){
        paperStatus = $("#searchPaperStatus").val();
    });

    //$(".panel-body").on('click', '#searchPaper', function(){
    $("#searchPaper").unbind('click').click(function(){
        //alert('hi');
        btnSearchStatus = 0;
        generalSearchPaper(btnSearchStatus);
    });

    //$(".panel-footer").on('click', '#advPaperSearchBtn', function(){
    $("#advPaperSearchBtn").unbind('click').click(function(){
        btnSearchStatus = 1;
        generalSearchPaper(btnSearchStatus);
    });

    $("#tbodyManagePaper").on('click', 'td > button', function(){
        var paperId = $(this).attr('id');
        pId = $(this).parent().siblings().map(function(){
            return $(this).text();
        }).get(0);

        $.ajax({
            url: context+"/TDCS/exam/checkExamPaperInUse",
            type: "POST",
            data: {
                paperId: paperId
            },
            success: function(check){
                if(check == true || $("#dropdownId"+pId).val() == 1){
                    alert('ไม่สามารถแก้ไขชุดข้อสอบนี้ได้');
                }
                else{
                    toUrl(paperId);
                }
            }
        });
    });

    $("#tbodyManagePaper").on('click', '.checkPaper', function(){
        var paperId = $(this).parent().parent().find("button").attr('id');
        pId = $(this).parent().siblings().map(function(){
            return $(this).text();
        }).get(0);

        var check = $.ajax({
            url: context+"/TDCS/exam/checkExamPaperInUse",
            type: "POST",
            data: {
                paperId: paperId
            },
            async: false,
            success: function(check){

            }
        }).responseText;

        if(check == 'true' || $("#dropdownId"+pId).val() == 1){
            alert('ไม่สามารถลบชุดข้อสอบนี้ได้');
            this.checked = false;
        }
    });

    $("#checkPaperAll").on('click', function(){
        if(this.checked){
            $(".checkPaper").each(function(){
                pId = $(this).parent().siblings().map(function(){
                    return $(this).text();
                }).get(0);

                if($("#dropdownId"+pId).val() == 1 || $(this).attr('check') == 'true'){
                    this.checked = false;
                }
                else{
                    this.checked = true;
                }
            });
        }
        else{
            $(".checkPaper").each(function(){
                this.checked = false;
            });
        }
    });

    $("#tbodyManagePaper").on('change', 'select[name="paperStatus"]', function(){
        var paperId = $(this).attr('id');
        paperId = paperId.substr(10);
        updatePaperStatus(paperId);
        $(".checkPaper").each(function(){
            this.checked = false;
        });
        $("#checkPaperAll").removeAttr('checked');
    });

    $("#deletePapers").on('click', function(){
        if(!confirm('คุณต้องการลบชุดข้อสอบที่เลือกใช่หรือไม่?')){
            return false;
        }
        $("#tbodyManagePaper tr input[type='checkbox']:checked").each(function(){
            pId = $(this).parent().siblings().map(function(){
                return $(this).text();
            }).get(0);
            paperIdArray.push(pId);
        });
        deletePapers();
    });
});

function getAllPapers(){
    $.ajax({
        type : "POST",
        url : context+"/TDCS/exam/getAllPapers",
        contentType: "application/json",
        async: false,
        success : function(data){
            $("#tbodyManagePaper").empty();
            data.forEach(function(value){
                var paperName = value.name;
                if(paperName == undefined? paperName = "-": paperName = value.name);

                var posiId;
                var posiName;

                if(value.position != null){
                    posiId = value.position.posiId;
                    posiName = value.position.posiName;
                }
                else{
                    posiId = 0;
                    posiName = "ทั้งหมด";
                }

                var check = $.ajax({
                    url: context+"/TDCS/exam/checkExamPaperInUse",
                    type: "POST",
                    data: {
                        paperId: value.id
                    },
                    async: false,
                    success: function(check){

                    }
                }).responseText;

                $("#tbodyManagePaper").append(
                    '<tr>'+
                    '<td style="display: none;"><label id="'+value.id+'">'+value.id+'</label></td>'+
                    '<td class="pCheck"><input class="checkPaper" type="checkbox" check="'+check+'"/></td>'+
                    '<td><label id="lpaperCode'+value.code+'">'+value.code+'</label></td>'+
                    '<td style="text-align: left;"><label id="lpaperName'+paperName+'">'+paperName+'</label></td>'+
                    '<td><label id="lpaperCreateBy'+value.createBy.empId+'">'+value.createBy.thFname+' '+value.createBy.thLname+'</label></td>'+
                    '<td><label id="lpaperScore'+value.maxScore+'" class="label-control">'+value.maxScore+'</label></td>'+
                    '<td><label id="lpaperForPosition'+posiId+'" class="label-control">'+posiName+'</label></td>'+
                    '<td class="pSelect">'+
                    '<select id="dropdownId'+value.id+'" name="paperStatus" class="btn btn-success btn-sm" style="text-align: left;">'+
                    //'<option value="3">ยังไม่เผยแพร่</option>'+
                    '<option value="1">เปิดใช้งาน</option>'+
                    '<option value="2">ปิดการใช้งาน</option>'+
                    '</select>'+
                    '</td>'+
                    '<td class="pButton"><button id="'+value.id+'" class="btn btn-gray btn-sm"><span class="glyphicon glyphicon-pencil"></span></button></td>'+
                    '</tr>'
                );
                presentStatus(value.id, value.paperStatus.id);
            });
        }
    });
}

function updatePaperStatus(paperId) {
    var paperStatus = $("#dropdownId" + paperId).val();
    $.ajax({
        type: "POST",
        url:context+"/TDCS/exam/updatePaperStatus",
        data: {
            paperId: paperId,
            paperStatus: paperStatus
        },
        success: function () {
            alert('อัพเดทสถานะเรียบร้อยแล้ว');
        },
        error: function () {
            alert('error');
        }
    });
    setColorDropdown(paperId, paperStatus);
}

function presentStatus(paperId, presentStatus){
    $("#dropdownId"+paperId).val(presentStatus);
    setColorDropdown(paperId, presentStatus);
}

function setColorDropdown(paperId, paperStatus){
    if(paperStatus == 1) {
        $("#dropdownId"+paperId).css('background-color', '#33CC33');
        $("#dropdownId"+paperId).css('border-color', '#33CC33');
    }
    if(paperStatus == 2) {
        $("#dropdownId"+paperId).css('background-color', '#669999');
        $("#dropdownId"+paperId).css('border-color', '#669999');
    }
    if(paperStatus == 3) {
        $("#dropdownId"+paperId).css('background-color', '#33CCFF');
        $("#dropdownId"+paperId).css('border-color', '#33CCFF');
    }
}

function deletePapers(){
    var jsonObj = {};
    var tmpArray = new Array();
    for(var i = 0; i < paperIdArray.length; i++){
        var item = {
            "paperId": paperIdArray[i]
        };
        tmpArray.push(item);
    }
    jsonObj = JSON.stringify(tmpArray);
    $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/deletePaper",
        contentType: "application/json",
        data: jsonObj,
        success: function () {
            alert('ลบชุดข้อสอบเรียบร้อยแล้ว');
            window.location.reload();
        },
        error: function () {
            alert('ลบชุดข้อสอบผิดพลาด');
        }
    });
    paperIdArray = [];
}

function generalSearchPaper(btnSearchStatus) {

    itemLenght = ($("#showEmployeeSelected").children("button")).length;
    code = $("#paperCodeSearch").val();
    if (code == "" ? code = "" : code = $("#paperCodeSearch").val());
    name = $("#paperName").val();
    if (name == "" ? name = "" : name = $("#paperName").val());
    createDateFrom = $("#searchCreateDateFromInput").val();
    if (createDateFrom == "" ? createDateFrom = "" : createDateFrom = $("#searchCreateDateFromInput").val());
    createDateTo = $("#searchCreateDateToInput").val();
    if (createDateTo == "" ? createDateTo = "" : createDateTo = $("#searchCreateDateToInput").val());
    scoreFrom = $("#searchScoreFromInput").val();
    if (scoreFrom == "" ? scoreFrom = "" : scoreFrom = $("#searchScoreFromInput").val());
    scoreTo = $("#searchScoreToInput").val();
    if (scoreTo == "" ? scoreTo = "" : scoreTo = $("#searchScoreToInput").val());
    if (paperStatus == 0 ? paperStatus = "0" : paperStatus = $("#searchPaperStatus").val());
    arrayEmployeeToSearch = [];

    if (itemLenght > 0) {
        for (var i = 0; i < itemLenght; i++) {
            var temp = $("#showEmployeeSelected").children("button")[i].innerHTML;
            temp = temp.substring(temp.indexOf('_') + 1, temp.indexOf('z'));
            arrayEmployeeToSearch.push(temp);
        }
        if (btnSearchStatus == 0) {
            for (var idx = 0; idx < arrayEmployeeToSearch.length; idx++) {
                var empIds = {
                    "empId": arrayEmployeeToSearch[idx],
                    "code": code,
                    "name": name,
                    "createDateFrom": createDateFrom,
                    "createDateTo": createDateTo,
                    "scoreFrom": scoreFrom,
                    "scoreTo": scoreTo,
                    "paperStatus": paperStatus,
                    "buttonStatus": btnSearchStatus
                };
                tempArray.push(empIds);
            }
        }
        if (btnSearchStatus == 1) {
            for (var idx1 = 0; idx1 < arrayEmployeeToSearch.length; idx1++) {
                var empIds1 = {
                    "empId": arrayEmployeeToSearch[idx1],
                    "code": code,
                    "name": name,
                    "createDateFrom": createDateFrom,
                    "createDateTo": createDateTo,
                    "scoreFrom": scoreFrom,
                    "scoreTo": scoreTo,
                    "paperStatus": paperStatus,
                    "buttonStatus": btnSearchStatus
                };
                tempArray.push(empIds1);
            }
        }
    }
    else {
        if (btnSearchStatus == 0) {
            var empIds2 = {
                "empId": '0',
                "code": code,
                "name": name,
                "createDateFrom": createDateFrom,
                "createDateTo": createDateTo,
                "scoreFrom": scoreFrom,
                "scoreTo": scoreTo,
                "paperStatus": paperStatus,
                "buttonStatus": btnSearchStatus
            };
            tempArray.push(empIds2);
        }
        if (btnSearchStatus == 1) {
            var empIds3 = {
                "empId": '0',
                "code": code,
                "name": name,
                "createDateFrom": createDateFrom,
                "createDateTo": createDateTo,
                "scoreFrom": scoreFrom,
                "scoreTo": scoreTo,
                "paperStatus": paperStatus,
                "buttonStatus": btnSearchStatus
            };
            tempArray.push(empIds3);
        }
    }
    var jsonObjz = JSON.stringify(tempArray);
    $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/searchPaper",
        dataType: "json",
        contentType: 'application/json',
        mimeType: 'application/json',
        data: jsonObjz,
        success: function (data) {
            if(data.length == 0){
                paperNotFound();
            }
            else{
                paperFound();
                $("#tbodyManagePaper").empty();
                data.forEach(function (value) {
                    var paperName = value.name;
                    if(paperName == undefined? paperName = "-": paperName = value.name);

                    var posiId;
                    var posiName;

                    if(value.position != null){
                        posiId = value.position.posiId;
                        posiName = value.position.posiName;
                    }
                    else{
                        posiId = 0;
                        posiName = "ทั้งหมด";
                    }

                    var check = $.ajax({
                        url: context+"/TDCS/exam/checkExamPaperInUse",
                        type: "POST",
                        data: {
                            paperId: value.id
                        },
                        async: false,
                        success: function(check){

                        }
                    }).responseText;
                    $("#tbodyManagePaper").append(
                        '<tr>'+
                        '<td style="display: none;"><label id="'+value.id+'">'+value.id+'</label></td>'+
                        '<td class="pCheck"><input class="checkPaper" type="checkbox" check="'+check+'"/></td>'+
                        '<td><label id="lpaperCode'+value.code+'">'+value.code+'</label></td>'+
                        '<td style="text-align: left;"><label id="lpaperName'+paperName+'">'+paperName+'</label></td>'+
                        '<td><label id="lpaperCreateBy'+value.createBy.empId+'">'+value.createBy.thFname+' '+value.createBy.thLname+'</label></td>'+
                        '<td><label id="lpaperScore'+value.maxScore+'" class="label-control">'+value.maxScore+'</label></td>'+
                        '<td><label id="lpaperForPosition'+posiId+'" class="label-control">'+posiName+'</label></td>'+
                        '<td class="pSelect">'+
                        '<select id="dropdownId'+value.id+'" name="paperStatus" class="btn btn-success btn-sm" style="text-align: left;">'+
                        //'<option value="3">ยังไม่เผยแพร่</option>'+
                        '<option value="1">เปิดใช้งาน่</option>'+
                        '<option value="2">ปิดใช้งาน</option>'+
                        '</select>'+
                        '</td>'+
                        '<td class="pButton"><button id="'+value.id+'" class="btn btn-gray btn-sm"><span class="glyphicon glyphicon-pencil"></span></button></td>'+
                        '</tr>'
                    );
                    presentStatus(value.id, value.paperStatus.id);
                });
            }
        }
    });
    tempArray = [];
}

function paperNotFound(){
    $("#paperNotFound").show();
    $("#tbManagePaper").hide();
}

function paperFound(){
    $("#paperNotFound").hide();
    $("#tbManagePaper").show();
}

function resetInput(){
    $("#paperCodeSearch").val('');
    $("#paperName").val('');
    $("#showEmployeeSelected").empty();
}

function resetAdvInput(){
    $("#paperCodeSearch").val('');
    $("#paperName").val('');
    $("#showEmployeeSelected").empty();
    $("#searchCreateDateFromInput").val('');
    $("#searchCreateDateToInput").val('');
    $("#searchScoreFromInput").val('');
    $("#searchScoreToInput").val('');
    $("#searchPaperStatus").val(0);
    $("#showEmployeeSelected").empty();
}