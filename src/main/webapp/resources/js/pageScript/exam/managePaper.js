var questionIdString = new Array();
var allQuestionIdOnTableCreatePaper = new Array();

var minutes;
var hours;
var questionsInPaper = new Array();
var newQuestionScore = new Array();
var sumPaperScore = 0;

var btnSearchStatus;
var categoryId = "";
var subcategoryId = "";
var arrayEmpNameToQuery = new Array();
var jsonObj = {};
var itemLenght;
var tempArray = new Array();

var questionDescriptionSearch = "";
var questionCreateDateFromSearch = "";
var questionCreateDateToSearch = "";
var questionScoreToSearch = "";
var questionScoreFromSearch = "";

var tmpQ = new Array();
var itm = {};

var paperId = 0;
var scoreChange = 0;

$(document).ready(function(){

    var value = getValueFromUrl();
    var id = value.substring(0, value.indexOf("#"));
    var paperStatus = value.substring(value.indexOf("#") + 1, value.length);
    if($.isNumeric(Number(id)) && paperStatus == "edit"){
        paperId = Number(id);
        onLoadPageEditPaper();
        showUpdatePaper(paperId);
    }
    else if($.isNumeric(Number(id)) && paperStatus == "info"){
        paperId = Number(id);
        showPaperInfo(paperId);
    }
    else{
        onLoadPageCreatePaper();
    }
    $("#randomQuestionBtn").on('click', function(){
        resetRandomQuestion();
    });

    $("button[modal-number=2]").click(function(){
        $("#questionPaperDetail").modal('hide');
    });

    $("#randResetBtn").unbind('click').click(function(){
        resetRandomQuestion();
    });

    if($("#randomQuestionModal").is(':visible')){
        resetRandomQuestion();
    }

    $("#randBtn").unbind('click').click(function(){
        randomQuestion();
    });

    $("#tbodySelectQuestion").on('click', 'td:not(.xyz)', function(){
        $('#questionPaperDetail').modal('show');
        var position = $(this).position().top + $(this).outerHeight(true);
        $('#questionPaperDetail').css('top', position/1.75);
        $('#questionPaperDetail').css('outline', 'none');
        var questionId = $(this).parent().find('label').attr('id');
        questionId = questionId.substring(questionId.indexOf('d')+1, questionId.length);
        showQuestionInfo(questionId);
    });

    $("#generalSearchButtonInModalSelectionQuestion").unbind('click').click(function(){
        //alert(getUserIds());
        btnSearchStatus = 0;

        generalSearchQuestion(btnSearchStatus);
    });

    $("#advSearchBtn").unbind('click').click(function(){
        btnSearchStatus = 1;
        generalSearchQuestion(btnSearchStatus);
    });

    $("#selectCategoryToSelection").change(function(){
        subcategoryId = $("#selectSubCategoryToSelection").val();
        categoryId = $("#selectCategoryToSelection").val();
        //if(subcategoryId == ""? subcategoryId = "": subcategoryId = $("#selectSubCategoryToSelection").val());
    });

    $("#selectSubCategoryToSelection").change(function(){
        subcategoryId = $("#selectSubCategoryToSelection").val();
        categoryId = $("#selectCategoryToSelection").val();
        //if(subcategoryId == ""? subcategoryId = "": subcategoryId = $("#selectSubCategoryToSelection").val());
    });

    if($("#newPaperScore").val() == ""){
        $("#maxScore").val(0);
    }

    $("#newPaperScore").change(function(){
        if($("#newPaperScore").val() == ""){
            $("#maxScore").val(0);
            $("#newPaperScore").val(0);
        }
        else{
            $("#maxScore").val($("#newPaperScore").val());
        }
    });

    $("#cancelCreatePaperBtn").unbind('click').click(function(){
        if($.isNumeric(Number(id)) && paperStatus == "edit"){
            if(!confirm('ข้อมูลยังไม่ถูกบันทึก ต้องการยกเลิกหรือไม่')){
                return false;
            }
        }
        else if($.isNumeric(Number(id)) && paperStatus == "info"){
            return true;
        }
        else{
            if(!confirm('ข้อมูลยังไม่ถูกบันทึก ต้องการยกเลิกหรือไม่')){
                return false;
            }
        }
    });

    //$("#selectionQuestionBtnInpagePaper").on('click' ,function(){
    $("#selectionQuestionBtnInpagePaper").unbind('click').click(function(){
        $("#selectQuest").modal('show');
        viewQuestions();
        if($("#tbSelectQuestion #tbodySelectQuestion tr").length == 0){
            $("#questionsAreEmpty").show();
            $("#removeRowSelected").attr('disabled', 'disabled');
            $("#addQuestionBtn").attr('disabled', 'disabled');
            $("#tbSelectQuestion").hide();
        }
    });

    $("#checkQuestionAll").click(function(event){
        if(this.checked){
            $(".selectQ").each(function(){
                this.checked = true;
            });
        }
        else{
            $(".selectQ").each(function(){
                this.checked = false;
            });
        }
    });
    $(".checkAllQuestionFromCreatePaperPage").click(function(){
        if(this.checked){
            $(".selectedQuestion").each(function(){
                this.checked = true;
            });
        }
        else{
            $(".selectedQuestion").each(function(){
                this.checked = false;
            });
        }
    });
    $("#removeRowSelected").on('click', function(){
        $("#tbSelectQuestion tr").has('input[class="selectQ"]:checked').remove();
        viewQuestions();
    });
    $("#removeRowQuestionSelect").on('click', function(){
        $("#tbSelectedQuestionToPaper tr").has('input[class="selectedQuestion"]:checked').remove();
        if($("#tbodySelectedQuestionToPaper tr").length == 0){
            $("#tbSelectedQuestionToPaper").hide();
            $("#questionNotFound").show();
            $("#score").val(0);
        }
        scoreOnChange();
    });

    $("#createPaperBtn").unbind('click').click(function(){
        newQuestionScore = [];
        $("#tbodySelectedQuestionToPaper tr input[type='number']").each(function(){
            newQuestionScore.push($(this).val());
        });
        minutes =  $("#minutes").val();
        if(minutes == ""? minutes = 0: minutes =  $("#minutes").val());
        hours = $("#hours").val();
        if(hours == ""? hours = 0: hours = $("#hours").val());
        createPaper();
    });

    $("#copyPaperBtn").unbind('click').click(function(){
        onLoadPageCopyPaper();
    });

    $("#cancelBtn").unbind('click').click(function(){
        window.location.reload(true);
    });

    $("#updatePaperBtn").unbind('click').click(function(){
        questionsInPaper = [];
        $("#tbodySelectedQuestionToPaper tr input:checkbox").each(function(){
            var qId = $(this).parent().siblings().map(function(){
                return $(this).text();
            }).get(0);
            questionsInPaper.push(qId);
        });
        newQuestionScore = [];
        $("#tbodySelectedQuestionToPaper tr input[type='number']").each(function(){
            newQuestionScore.push($(this).val());
        });
        minutes =  $("#minutes").val();
        hours = $("#hours").val();
        updatePaper();
    });

    $("#saveCopyPaperBtn").unbind('click').click(function(){
        var paperCode = $("#newPaperId").val();
        var paperName = $("#newPaperName").val();

        if(paperCode != ""){
            $("#newPaperId").css('border-color', 'green');
        }

        if(paperCode == ""){
            $("#newPaperId").focus();
            $("#newPaperId").css('border-color', 'red');
            alert('กรุณากรอกรหัสชุดข้อสอบ');

            return false;
        }

        var check = true;
        $.ajax({
            type: "POST",
            url: context+"/TDCS/exam/getPaperCodeCopy",
            async: false,
            success: function(codes){
                for(var i = 0; i < codes.length; i++){
                    if($("#newPaperId").val() == codes[i]){
                        alert('รหัสชุดข้อสอบซ้ำ');
                        $("#newPaperId").focus();
                        $("#newPaperId").css('border-color', 'red');
                        check = false;
                    }
                }
            }
        });

        if(check == false){
            return false;
        }

        $.ajax({
            type: "POST",
            url: context+"/TDCS/exam/copyPaper",
            async: true,
            data:{
                paperId: paperId,
                paperCode: paperCode,
                paperName: paperName
            },
            success: function(){
                alert('คัดลอกชุดข้อสอบเรียบร้อยแล้ว');
                //window.location.reload(true);
                window.location.href = "/TDCS/exam/managePapers";
            },
            error: function(){
                alert('เกิดข้อผิดพลาด');
            }
        });
    });

    $("#date").datepicker();
    function select(){
        $('#obj').click(function(){
            $('#objective').show();
            $('#objective2').show();
            $('#subjective').hide();
            $('#subjective2').hide();
        });

        $('#sub').click(function(){
            $('#subjective').show();
            $('#subjective2').show();
            $('#objective').hide();
            $('#objective2').hide();
        })
    }
});

$("#addQuestionBtn").unbind('click').click(function(){
    $("#tbSelectQuestion tbody input:checkbox:checked").each(function(){
        var qId = $(this).parent().siblings().map(function(){
            return $(this).text();
        }).get(0);
        addQuestionToPaper(qId);
        scoreOnChange();
    });
});

function viewQuestions(){
    if($("#tbSelectedQuestionToPaper").is(":hidden") || $("#selectQuest").is(":visible") || $("#questionsAreEmpty").is(':visible')){
        //alert('1');
        $("#checkQuestionAll").attr('checked', false);
        var dataResponse = $.ajax({
            type: "POST",
            contentType: "application/json",
            url: context+"/TDCS/exam/getAllQuestionDetail",
            async: false,
            success: function(dataResponse){
                dataFound();
                $("#tbodySelectQuestion").empty();
                dataResponse.forEach(function(value){

                    //new
                    var createDate = new Date(value.createDate);
                    var dateFormat = createDate.getDate() +" "+ getMonthFormat(createDate.getMonth()) +" "+ (Number(createDate.getFullYear()));
                    var str = "";
                    if(value.choices != null){
                        var i = 1;
                        (value.choices).forEach(function(value2){
                            if(Number(value.status.id) == 3){
                                str = str +'<td style="display: none;"><label id="labelChoice'+i+value.id+'">'+value2.description+'</td>'+
                                    '<td style="display: none;"><label id="labelChoiceCorrection'+i+value.id+'">'+value2.correction.value+'</td>';
                            }
                            i = i+1;
                        });
                    }
                    //

                    $("#tbodySelectQuestion").append(
                        '<tr>'+
                        '<td style="display: none;"><label id="labelQuestionId'+value.id+'">'+value.id+'</td>'+

                        '<td style="display: none;"><label id="labelCreateDateId'+value.id+'">'+dateFormat+'</td>'+
                        '<td style="display: none;"><label id="labelQuestionTypeId'+value.id+'">'+value.questionType.id+'</td>'+
                        str+

                        '<td class="xyz" style="text-align: center;"><input class="selectQ" name="selectQ" type="checkbox"/></td>'+
                        '<td style="text-align: left;"><label id="labelCategoryName'+value.id+'">'+value.subCategory.category.name+'<label></td>'+
                        '<td style="text-align: left;"><label id="labelSubCategoryName'+value.id+'">'+value.subCategory.name+'</label></td>'+
                        '<td style="text-align: left;"><label id="labelQuestionDesc'+value.id+'">'+value.description+'</label></td>'+
                        '<td><label id="labelQuestionTypeDesc'+value.id+'">'+value.questionType.description+'</td>'+
                        '<td style="text-align: center;"><label id="labelDiffDesc'+value.id+'">'+value.difficultyLevel.description+'</td>'+
                        '<td style="text-align: center;"><label id="labelScore'+value.id+'">'+value.score+'</td>'+

                        '<td style="text-align: center;"><label id="labelQuestionCreateBy'+value.id+'">'+value.createBy.thFname+" "+value.createBy.thLname+'</td>'+
                        '<td style="display: none;"><label id="labelQuestionCreateDate'+value.id+'">'+value.createDate+'</td>'+

                        '</tr>'
                    );
                });
            },
            error: function(){
                alert("เกิดข้อผิดพลาดขณะร้องขอข้อมูล...");
            }
        });
    }
    if(($("#tbodySelectQuestion tr").length != 0 && $("#tbodySelectedQuestionToPaper tr").length != 0) || $("#tbodySelectedQuestionToPaper tr").length > 0){
        $("#tbSelectQuestion").show();
        $("#questionsAreEmpty").hide();
        $("#removeRowSelected").removeAttr('disabled');
        $("#addQuestionBtn").removeAttr('disabled');
        allQuestionIdOnTableCreatePaper = [];
        $("#tbodySelectedQuestionToPaper tr input:checkbox").each(function(){
            var temp = $(this).parent().siblings().map(function(){
                return $(this).text();
            }).get(0);
            allQuestionIdOnTableCreatePaper.push(temp);
        });
        // converse array to json.
        var toJsonObject = {};
        var tempz = new Array();
        for(var i = 0; i < allQuestionIdOnTableCreatePaper.length; i++){
            var item = {
                "id" : allQuestionIdOnTableCreatePaper[i]
            };
            tempz.push(item);
        }
        toJsonObject = JSON.stringify(tempz);

        var dataResponse = $.ajax({
            type: "POST",
            contentType: "application/json",
            url: context+"/TDCS/exam/getQuestionNotInSelected",
            data: toJsonObject,
            async: false,
            success: function(data){
                if(data.length == 0){
                    //alert('2');
                    dataNotFound();
                }
                else{
                    dataFound();
                    //alert('3');
                    $("#checkQuestionAll").attr('checked', false);
                    $("#tbSelectQuestion").show();
                    $("#tbodySelectQuestion").empty();
                    data.forEach(function(value){

                        var createDate = new Date(value.createDate);
                        var dateFormat = createDate.getDate() +" "+ getMonthFormat(Number(createDate.getMonth()) + 1) +" "+ (Number(createDate.getFullYear()));
                        var str = "";
                        if(value.choices != null){
                            var i = 1;
                            (value.choices).forEach(function(value2){
                                if(Number(value.status.id) == 3){
                                    str = str +'<td style="display: none;"><label id="labelChoice'+i+value.id+'">'+value2.description+'</td>'+
                                        '<td style="display: none;"><label id="labelChoiceCorrection'+i+value.id+'">'+value2.correction.value+'</td>';
                                }
                                i = i+1;
                            });
                        }

                        $("#tbodySelectQuestion").append(
                            '<tr>'+
                            '<td style="display: none;"><label id="labelQuestionId'+value.id+'">'+value.id+'</td>'+

                            '<td style="display: none;"><label id="labelCreateDateId'+value.id+'">'+dateFormat+'</td>'+
                            '<td style="display: none;"><label id="labelQuestionTypeId'+value.id+'">'+value.questionType.id+'</td>'+
                            str+

                            '<td class="xyz" style="text-align: center;"><input class="selectQ" name="selectQ" type="checkbox"/></td>'+
                            '<td style="text-align: left;"><label id="labelCategoryName'+value.id+'">'+value.subCategory.category.name+'<label></td>'+
                            '<td style="text-align: left;"><label id="labelSubCategoryName'+value.id+'">'+value.subCategory.name+'</label></td>'+
                            '<td style="text-align: left;"><label id="labelQuestionDesc'+value.id+'">'+value.description+'</label></td>'+
                            '<td><label id="labelQuestionTypeDesc'+value.id+'">'+value.questionType.description+'</td>'+
                            '<td style="text-align: center;"><label id="labelDiffDesc'+value.id+'">'+value.difficultyLevel.description+'</td>'+
                            '<td style="text-align: center;"><label id="labelScore'+value.id+'">'+value.score+'</td>'+

                            '<td style="text-align: center;"><label id="labelQuestionCreateBy'+value.id+'">'+value.createBy.thFname+" "+value.createBy.thLname+'</td>'+
                            '<td style="display: none;"><label id="labelQuestionCreateDate'+value.id+'">'+value.createDate+'</td>'+

                            '</tr>'
                        );
                    });
                }
            },
            error: function(){
                alert("เกิดข้อผิดพลาดขณะร้องขอข้อมูล...");
            }
        });
    }
}

function addQuestionToPaper(qId){
    questionIdString = [];
    questionIdString.push(qId);
    var newScore = $('#labelScore'+qId).text();
    $("#tbSelectedQuestionToPaper").show();
    $("#tbodySelectedQuestionToPaper").append(
        '<tr>'+
        '<td style="display: none;">'+$("#labelQuestionId"+qId).text()+'</td>'+
        '<td style="text-align: center;"><input type="checkbox" class="selectedQuestion"/></td>'+
        '<td style="text-align: center;">'+$("#labelQuestionTypeDesc"+qId).text()+'</td>'+
        '<td>'+$("#labelCategoryName"+qId).text()+'</td>'+
        '<td>'+$("#labelSubCategoryName"+qId).text()+'</td>'+
        '<td>'+$("#labelQuestionDesc"+qId).text()+'</td>'+
        '<td style="text-align: center;">'+$("#labelDiffDesc"+qId).text()+'</td>'+
        '<td><input id="newScore'+qId+'" onchange="scoreOnChange()" name="newScore" type="number" class="form-control input-sm"  min="1" max="50" value="'+newScore+'"/></td>'+
        '<td style="text-align: center;">'+$("#labelQuestionCreateBy"+qId).text()+'</td>'+
        '</tr>'
    );
    $("#questionNotFound").hide();
    questionsInPaper.push(qId);
    sumScore(Number($("#newScore"+qId).val()));
    $("#score").val(sumPaperScore);
}

function createPaperValidation(){

    var paperTime = ((parseInt(hours) * 60) + parseInt(minutes));

    if($("#newPaperId").val() != ""){
        $("#newPaperId").css('border-color', 'green');
    }

    if($("#newPaperScore").val() != "" && $.isNumeric($("#newPaperScore").val()) == true){
        $("#newPaperScore").css('border-color', 'green');
    }
    if($("#newPaperForPosition").val() != "เลือกตำแหน่ง"){
        $("#newPaperForPosition").css('border-color', 'green');
    }
    if(paperTime > 0){
        $("#hours").css('border-color', 'green');
        $("#minutes").css('border-color', 'green');
    }

    if($("#newPaperId").val() == ""){
        $("#newPaperId").focus();
        $("#newPaperId").css('border-color', 'red');
        alert('กรุณากรอกรหัสชุดข้อสอบ');

        return false;
    }

    if($("#newPaperScore").val() == "" || $.isNumeric($("#newPaperScore").val()) == false){
        $("#newPaperScore").focus();
        $("#newPaperScore").css('border-color', 'red');
        alert('กรุณากรอกคะแนนชุดข้อสอบ');

        return false;
    }
    if($("#newPaperForPosition").val() == "เลือกตำแหน่ง"){
        $("#newPaperForPosition").css('border-color', 'red');
        alert('กรุณาเลือกตำแหน่ง');

        return false;
    }

    if(paperTime == 0){
        $("#hours").css('border-color', 'red');
        $("#minutes").css('border-color', 'red');
        alert('กรุณาระบุเวลาการทำชุดข้อสอบ');

        return false;
    }
    if($("#questionNotFoundDesc").is(":visible")){
        alert('โปรดเลือกข้อสอบ');
        return false;
    }
}

function validateScore(){
    if($("#score").val() > $("#maxScore").val()){
        alert('คะแนนมากกว่าที่กำหนด');
        $("#maxScore").focus();
        $("#score").css('border-color', 'red');
        return false;
    }
    if($("#score").val() < $("#maxScore").val()){
        alert('คะแนนน้อยกว่าที่กำหนด');
        $("#maxScore").focus();
        $("#score").css('border-color', 'red');
        return false;
    }
}

function createPaper(){

    var check = true;
    $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/getPaperCode",
        data: {
            pId: paperId
        },
        async: false,
        success: function(codes){
            for(var i = 0; i < codes.length; i++){
                if($("#newPaperId").val() == codes[i]){
                    alert('รหัสชุดข้อสอบซ้ำ');
                    $("#newPaperId").focus();
                    $("#newPaperId").css('border-color', 'red');
                    check = false;
                }
            }
        }
    });

    if(check == false){
        return false;
    }

    if(createPaperValidation() == false){
        return false;
    }
    if(validateScore() == false){
        return false;
    }

    var paperCode = $("#newPaperId").val();
    var paperName = $("#newPaperName").val();
    var paperScore = $("#newPaperScore").val();
    var paperTime = ((parseInt(hours) * 60) + parseInt(minutes));
    var paperForPosition = $("#newPaperForPosition").val();
    if(paperForPosition == ""? paperForPosition = 0: paperForPosition = $("#newPaperForPosition").val());
    var jsonObjQuestion = {};
    var tempArrayQuestion = new Array();

    for(var idx = 0; idx < questionsInPaper.length; idx++){
        var item = {
            "qId": questionsInPaper[idx],
            "qScore" : newQuestionScore[idx]
        };
        tempArrayQuestion.push(item);
    }
    jsonObjQuestion = JSON.stringify(tempArrayQuestion);

    $.ajax({
        type: "POST",
        url:context+ "/TDCS/exam/createPaper",
        data: {
            paperCode : paperCode,
            paperName : paperName,
            paperScore : paperScore,
            paperTime : paperTime,
            paperForPosition : paperForPosition,
            jsonObjQuestion : jsonObjQuestion
        },
        success: function(paperId){
            alert('บันทึกข้อมูลสำเร็จ');
            //window.location.href = "/TDCS/exam/managePapers";
            toUrl(paperId);
        },
        error: function(){
            alert('เกิดข้อผิดพลาด');
        }
    });

    newQuestionScore = [];
}

function onLoadPageCreatePaper(){
    $("#questionNotFound").show();
    $("#copyPaperBtn").hide();
    $("#tbSelectedQuestionToPaper").hide();
    $("#removeRowSelected").removeAttr('disabled');
    $("#addQuestionBtn").removeAttr('disabled');
    $("#score").val(0);
    $("#maxScore").val(0);
    $("#hours").defaultValue = "0";
}

function onLoadPageCopyPaper(){
    $("h3").text('คัดลอกชุดข้อสอบ '+$("#newPaperId").val()+" : "+$("#newPaperName").val());
    $("#copyPaperBtn").hide();
    $("#updatePaperBtn").hide();
    $("#saveCopyPaperBtn").show();
    $("#cancelBtn").show();
    $("#cancelCreatePaperBtn").hide();
    $("#newPaperScore").attr('disabled', 'disabled');
    $("#newPaperForPosition").attr('disabled', 'disabled');
    $("#hours").attr('disabled', 'disabled');
    $("#minutes").attr('disabled', 'disabled');
    $("body button:not(#saveCopyPaperBtn):not(#cancelBtn)").attr('disabled', 'disabled');
    $("#tbSelectedQuestionToPaper input[type=checkbox], #tbSelectedQuestionToPaper input[type=number]").attr('disabled', 'disabled');
}

function onLoadPageEditPaper(){
    $("#copyPaperBtn").show();
    $("#questionNotFound").hide();
    $("#removeRowSelected").removeAttr('disabled');
    $("#addQuestionBtn").removeAttr('disabled');
    $("#score").val(0);
    $("#maxScore").val(0);
    $("#hours").defaultValue = "0";
}

function onLoadPagePaperInfo(){
    $("#tbSelectedQuestionToPaper").hide();
    $(".btn:not(#cancelCreatePaperBtn)").hide();
    $("#tbPaperInfo").show();
    $("h3").text('ข้อมูลชุดข้อสอบ');
    $("#cancelCreatePaperBtn").text('ย้อนกลับ');
}

function sumScore(score){
    sumPaperScore = sumPaperScore + Number(score);
}

//function isNumber(e){
//    e = (e)? e: window.event;
//    var charCode;
//    var charCode = (e.which) ? e.which : e.keyCode;
//    if (charCode > 48 && charCode < 57) {
//        return false;
//    }
//    return true;
//}

//$("#tbSelectedQuestionToPaper input[type=number]").on('focus', function(){
//    scoreChange = $(this).val();
//    alert(scoreChange);
//});

function scoreOnChange(){
    var sumScoreChanged = 0;
    $("#tbodySelectedQuestionToPaper tr input[type='number']").each(function(){
        if(Number($(this).val()) < 1 || !$.isNumeric(Number($(this).val()))){
            $(this).val(1);
            sumScoreChanged = sumScoreChanged + Number($(this).val());
        }
        else{
            sumScoreChanged = sumScoreChanged + Number($(this).val());
        }
    });
    $("#score").val(sumScoreChanged);
}

function generalSearchQuestion(btnSearchStatus) {

    itemLenght = ($("#showEmployeeSelected").children("button")).length;
    if(categoryId.indexOf(':')!=-1){
        categoryId = categoryId.substring(0, categoryId.indexOf(':') - 1);
    }
    else{
        categoryId = categoryId;
    }
    if(subcategoryId == null? subcategoryId = "": subcategoryId = subcategoryId);
    questionDescriptionSearch = $("#searchQuestionDescInput").val();
    if(questionDescriptionSearch == ""? questionDescriptionSearch = "": questionDescriptionSearch = $("#searchQuestionDescInput").val());
    questionCreateDateFromSearch = $("#searchCreateDateFromInput").val();
    if(questionCreateDateFromSearch == ""? questionCreateDateFromSearch = "": questionCreateDateFromSearch = $("#searchCreateDateFromInput").val());
    questionCreateDateToSearch = $("#searchCreateDateToInput").val();
    if(questionCreateDateToSearch == ""? questionCreateDateToSearch = "": questionCreateDateToSearch = $("#searchCreateDateToInput").val());
    questionScoreFromSearch = $("#searchScoreFromInput").val();
    if(questionScoreFromSearch == ""? questionScoreFromSearch = "": questionScoreFromSearch = $("#searchScoreFromInput").val());
    questionScoreToSearch = $("#searchScoreToInput").val();
    if(questionScoreToSearch == ""? questionScoreToSearch = "": questionScoreToSearch = $("#searchScoreToInput").val());
    questionCreateDateFromSearch = $("#searchCreateDateFromInput").val();
    if(questionCreateDateFromSearch == ""? questionCreateDateFromSearch = "": questionCreateDateFromSearch = $("#searchCreateDateFromInput").val());
    questionCreateDateToSearch = $("#searchCreateDateToInput").val();
    if(questionCreateDateToSearch == ""? questionCreateDateToSearch = "": questionCreateDateToSearch = $("#searchCreateDateToInput").val());

    if(itemLenght > 0){

        for (var i = 0; i < itemLenght; i++) {
            var temp = $("#showEmployeeSelected").children("button")[i].innerHTML;
            temp = temp.substring(temp.indexOf('_')+1, temp.indexOf('z'));
            arrayEmpNameToQuery.push(temp);
        }
        if(btnSearchStatus == 0){

            for (var index = 0; index < allQuestionIdOnTableCreatePaper.length; index ++){
                itm = {
                    "qId" : allQuestionIdOnTableCreatePaper[index]
                };
                tmpQ.push(itm);
            }
            for (var idx = 0; idx < arrayEmpNameToQuery.length; idx++) {
                var items = {
                    "thFname": arrayEmpNameToQuery[idx],
                    "subCategoryId": subcategoryId,
                    "categoryId": categoryId,
                    "btnSearchStatus" : btnSearchStatus,
                    "allQuestionIdOnTableCreatePaper" : tmpQ,
                    "questionDescriptionSearch" : questionDescriptionSearch,
                    "questionCreateDateFromSearch" : questionCreateDateFromSearch,
                    "questionCreateDateToSearch" : questionCreateDateToSearch,
                    "questionScoreToSearch" : questionScoreToSearch,
                    "questionScoreFromSearch" : questionScoreFromSearch
                };
                tempArray.push(items);
            }
            arrayEmpNameToQuery = [];
        }

        if(btnSearchStatus == 1){
            for (var index = 0; index < allQuestionIdOnTableCreatePaper.length; index ++){
                itm = {
                    "qId" : allQuestionIdOnTableCreatePaper[index]
                };
                tmpQ.push(itm);
            }
            for (var idx = 0; idx < arrayEmpNameToQuery.length; idx++) {
                var items = {
                    "thFname": arrayEmpNameToQuery[idx],
                    "subCategoryId": subcategoryId,
                    "categoryId": categoryId,
                    "btnSearchStatus" : btnSearchStatus,
                    "allQuestionIdOnTableCreatePaper" : tmpQ,
                    "questionDescriptionSearch" : questionDescriptionSearch,
                    "questionCreateDateFromSearch" : questionCreateDateFromSearch,
                    "questionCreateDateToSearch" : questionCreateDateToSearch,
                    "questionScoreToSearch" : questionScoreToSearch,
                    "questionScoreFromSearch" : questionScoreFromSearch
                };
                tempArray.push(items);
            }
        }
    }
    else{
        if(btnSearchStatus == 0){
            for (var index3 = 0; index3 < allQuestionIdOnTableCreatePaper.length; index3 ++){
                itm = {
                    "qId" : allQuestionIdOnTableCreatePaper[index3]
                };
                tmpQ.push(itm);
            }
            var item = {
                "thFname": '0',
                "subCategoryId": subcategoryId,
                "categoryId": categoryId,
                "btnSearchStatus" : btnSearchStatus,
                "allQuestionIdOnTableCreatePaper" : tmpQ,
                "questionDescriptionSearch" : questionDescriptionSearch,
                "questionCreateDateFromSearch" : questionCreateDateFromSearch,
                "questionCreateDateToSearch" : questionCreateDateToSearch,
                "questionScoreToSearch" : questionScoreToSearch,
                "questionScoreFromSearch" : questionScoreFromSearch
            };
            tempArray.push(item);
        }
        if(btnSearchStatus == 1){
            for (var index4 = 0; index4 < allQuestionIdOnTableCreatePaper.length; index4 ++){
                itm = {
                    "qId" : allQuestionIdOnTableCreatePaper[index4]
                };
                tmpQ.push(itm);
            }
            var item2 = {
                "thFname": '0',
                "subCategoryId": subcategoryId,
                "categoryId": categoryId,
                "btnSearchStatus" : btnSearchStatus,
                "allQuestionIdOnTableCreatePaper" : tmpQ,
                "questionDescriptionSearch" : questionDescriptionSearch,
                "questionCreateDateFromSearch" : questionCreateDateFromSearch,
                "questionCreateDateToSearch" : questionCreateDateToSearch,
                "questionScoreToSearch" : questionScoreToSearch,
                "questionScoreFromSearch" : questionScoreFromSearch
            };
            tempArray.push(item2);
        }
    }
    jsonObj = JSON.stringify(tempArray);
    //alert(jsonObj);
    var dataResponse = $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/generalQuestionSearch",
        dataType: "json",
        contentType: 'application/json',
        mimeType: 'application/json',
        data: jsonObj,
        success: function (result) {
            if(result.length == 0){
                dataNotFound();
            }
            else{
                dataFound();
                $("#tbodySelectQuestion").empty();
                result.forEach(function(value){
                    //new
                    var createDate = new Date(value.createDate);
                    var dateFormat = createDate.getDate() +" "+ getMonthFormat(Number(createDate.getMonth()) + 1) +" "+ (Number(createDate.getFullYear()));
                    var str = "";
                    if(value.choices != null){
                        var j = 1;
                        (value.choices).forEach(function(value2){
                            if(Number(value.status.id) == 3){
                                str = str +'<td style="display: none;"><label id="labelChoice'+j+value.id+'">'+value2.description+'</td>'+
                                    '<td style="display: none;"><label id="labelChoiceCorrection1'+value.id+'">'+value2.correction.value+'</td>';
                            }
                            j = j+1;
                        });
                    }
                    //
                    $("#tbodySelectQuestion").append(
                        '<tr>'+
                        '<td style="display: none;"><label id="labelQuestionId'+value.id+'">'+value.id+'</td>'+

                        '<td style="display: none;"><label id="labelCreateDateId'+value.id+'">'+dateFormat+'</td>'+
                        '<td style="display: none;"><label id="labelQuestionTypeId'+value.id+'">'+value.questionType.id+'</td>'+
                        str+

                        '<td class="xyz" style="text-align: center;"><input class="selectQ" name="selectQ" type="checkbox"/></td>'+
                        '<td style="text-align: left;"><label id="labelCategoryName'+value.id+'">'+value.subCategory.category.name+'<label></td>'+
                        '<td style="text-align: left;"><label id="labelSubCategoryName'+value.id+'">'+value.subCategory.name+'</label></td>'+
                        '<td style="text-align: left;"><label id="labelQuestionDesc'+value.id+'">'+value.description+'</label></td>'+
                        '<td style="text-align: center;"><label id="labelQuestionTypeDesc'+value.id+'">'+value.questionType.description+'</td>'+
                        '<td style="text-align: center;"><label id="labelDiffDesc'+value.id+'">'+value.difficultyLevel.description+'</td>'+
                        '<td style="text-align: center;"><label id="labelScore'+value.id+'">'+value.score+'</td>'+

                        '<td style="text-align: center;"><label id="labelQuestionCreateBy'+value.id+'">'+value.createBy.thFname+" "+value.createBy.thLname+'</td>'+
                        '<td style="display: none;"><label id="labelQuestionCreateDate'+value.id+'">'+value.createDate+'</td>'+

                        '</tr>'
                    );
                });
            }
        },
        error: function () {
            alert('เกิดข้อผิดพลาด');
        }
    });
    categoryId = "";
    subcategoryId = "";
    arrayEmpNameToQuery = [];
    tempArray = [];
    tmpQ = [];
    //allQuestionIdOnTableCreatePaper = [];
}

function dataNotFound(){
    $("#questionsAreEmpty").show();
    $("#removeRowSelected").attr('disabled', 'disabled');
    $("#addQuestionBtn").attr('disabled', 'disabled');
    $("#tbSelectQuestion").hide();
}

function dataFound(){
    $("#questionsAreEmpty").hide();
    $("#removeRowSelected").removeAttr('disabled');
    $("#addQuestionBtn").removeAttr('disabled');
    $("#tbSelectQuestion").show();
}

function toUrl(paperId){
    window.location.href = "/TDCS/exam/createPaper?pId="+paperId+"#edit";
}

function getValueFromUrl(){
    var pidFromUrl = window.location.href;
    pidFromUrl = pidFromUrl.substring(pidFromUrl.indexOf('?') + 5, pidFromUrl.length);

    return pidFromUrl;
}

function showUpdatePaper(paperId){

    $("title").text('แก้ไขชุดข้อสอบ');
    onLoadPageUpdatePaper();
    $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/getPaperQuestionByPaper",
        data : {
            paperId : paperId
        },
        async: false,
        success: function(data){
            $("#tbodySelectedQuestionToPaper").empty();
            data.forEach(function(value){
                $("#newPaperId").val(value.examPaper.code);
                if($("#newPaperName").val(value.examPaper.name) == null? $("#newPaperName").val(''): $("#newPaperName").val(value.examPaper.name));
                $("#newPaperScore").val(value.examPaper.maxScore);
                $("#maxScore").val(value.examPaper.maxScore);

                var posiId;
                var posiName;

                if(value.examPaper.position != null){
                    posiId = value.examPaper.position.posiId;
                }
                else{
                    posiId = 0;
                }
                $("#newPaperForPosition").val(Number(posiId));

                var paperTime = value.examPaper.timeLimit;
                var hours = Math.floor(paperTime / 60);
                var minutes = paperTime % 60;
                $("#hours").val(hours);
                $("#minutes").val(minutes);

                $("#tbodySelectedQuestionToPaper").append(
                    '<tr>'+
                    '<td style="display: none;">'+ value.question.id+'</td>'+

                    '<td style="text-align: center;"><input type="checkbox" class="selectedQuestion"/></td>'+
                    '<td>'+ value.question.questionType.description+'</td>'+
                    '<td>'+ value.question.subCategory.category.name+'</td>'+
                    '<td>'+ value.question.subCategory.name+'</td>'+
                    '<td style="text-align: left;">'+ value.question.description+'</td>'+
                    '<td>'+ value.question.difficultyLevel.description+'</td>'+
                    '<td><input id="newScore'+value.question.id+'" onkeypress="return isNumber(event)" onchange="scoreOnChange()" name="newScore" type="number" class="form-control innput-sm"  min="1" max="50" value="'+value.score+'"/></td>'+
                    '<td>'+ value.question.createBy.thFname+' '+value.question.createBy.thLname+'</td>'+
                    '</tr>'
                );
                sumScore(value.score);
                $("#score").val(sumPaperScore);
            });
            sumPaperScore = 0;
        },
        error: function(){
            alert("เกิดข้อผิดพลาดขณะร้องขอข้อมูล...");
        }
    });
    sumPaperScore = 0;
    //onLoadPageUpdatePaper();
}

function showPaperInfo(pId){
    $("title").text('ข้อมูลชุดข้อสอบ');
    $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/getPaperQuestionByPaper",
        data : {
            paperId : paperId
        },
        async: false,
        success: function(data){
            onLoadPagePaperInfo();
            $("#tbPaperInfo tbody").empty();
            data.forEach(function(j){
                $("#newPaperId").val(j.examPaper.code).attr('disabled', 'disabled');
                if($("#newPaperName").val(j.examPaper.name) == null? $("#newPaperName").val(''): $("#newPaperName").val(j.examPaper.name).attr('disabled', 'disabled'));
                $("#newPaperScore").val(j.examPaper.maxScore).attr('disabled', 'disabled');
                $("#maxScore").val(j.examPaper.maxScore);

                var posiId;
                var posiName;

                if(j.examPaper.position != null){
                    posiId = j.examPaper.position.posiId;
                }
                else{
                    posiId = 0;
                }
                $("#newPaperForPosition").val(posiId).attr('disabled', 'disabled');

                var paperTime = j.examPaper.timeLimit;
                var hours = Math.floor(paperTime / 60);
                var minutes = paperTime % 60;
                $("#hours").val(hours).attr('disabled', 'disabled');
                $("#minutes").val(minutes).attr('disabled', 'disabled');
                $("#divCreateDate").show();

                var createDate = new Date(j.examPaper.createDate);
                var dateFormat = (createDate.getDate()+22) +" "+ getMonthFormat(Number(createDate.getMonth())) +" "+ (createDate.getFullYear()+543);

                $("#questionCreatedDate").val(dateFormat);

                $("#tbPaperInfo tbody").append(
                    '<tr>'+
                    '<td style="display: none;">'+ j.question.id+'</td>'+
                    '<td style="text-align: center;">'+ j.question.questionType.description+'</td>'+
                    '<td>'+ j.question.subCategory.category.name+'</td>'+
                    '<td>'+ j.question.subCategory.name+'</td>'+
                    '<td style="text-align: left;">'+ j.question.description+'</td>'+
                    '<td style="text-align: center;">'+ j.question.difficultyLevel.description+'</td>'+
                    '<td style="text-align: center;">'+ j.score+'</td>'+
                    '<td style="text-align: center;">'+ j.question.createBy.thFname+' '+j.question.createBy.thLname+'</td>'+
                    '</tr>'
                );
                sumScore(j.score);
                $("#score").val(sumPaperScore);
            });
        },
        error: function(){
            alert("เกิดข้อผิดพลาดขณะร้องขอข้อมูล...");
        }
    });
    sumPaperScore = 0;
    //onLoadPageUpdatePaper();
}

function onLoadPageUpdatePaper(){
    $("h3:not('#questionNotFoundDesc')").text('แก้ไขชุดข้อสอบ');
    $("#createPaperBtn").hide();
    $("#updatePaperBtn").show();
}

function resetRandomQuestion(){
    $("#randEasy").val('');
    $("#randNormal").val('');
    $("#randHard").val('');
}

function updatePaper(){

    var check = true;
    $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/getPaperCode",
        data: {
            pId: paperId
        },
        async: false,
        success: function(codes){
            for(var i = 0; i < codes.length; i++){
                if($("#newPaperId").val() == codes[i]){
                    alert('รหัสชุดข้อสอบซ้ำ');
                    $("#newPaperId").focus();
                    $("#newPaperId").css('border-color', 'red');
                    check = false;
                }
            }
        }
    });

    if(check == false){
        return false;
    }

    if(createPaperValidation() == false){
        return false;
    }
    if(validateScore() == false){
        return false;
    }

    var paperCodeUpdate = $("#newPaperId").val();
    var paperNameUpdate = $("#newPaperName").val();
    var paperScoreUpdate = $("#newPaperScore").val();
    var paperTimeUpdate = ((parseInt(hours) * 60) + parseInt(minutes));
    var paperForPositionUpdate = $("#newPaperForPosition").val();
    if(paperForPositionUpdate == ""? paperForPositionUpdate = 0: paperForPositionUpdate = $("#newPaperForPosition").val());
    var jsonObjQuestionUpdate = {};
    var tempArrayQuestionUpdate = new Array();

    for(var idx = 0; idx < questionsInPaper.length; idx++){
        var item = {
            "qId": questionsInPaper[idx],
            "qScore" : newQuestionScore[idx]
        };
        tempArrayQuestionUpdate.push(item);
    }
    jsonObjQuestionUpdate = JSON.stringify(tempArrayQuestionUpdate);
    $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/updatePaper",
        data: {
            paperCodeUpdate  : paperCodeUpdate,
            paperNameUpdate  : paperNameUpdate ,
            paperScoreUpdate  : paperScoreUpdate ,
            paperTimeUpdate  : paperTimeUpdate ,
            paperForPositionUpdate  : paperForPositionUpdate ,
            jsonObjQuestionUpdate  : jsonObjQuestionUpdate,
            paperIdUpdate : paperId
        },
        success: function(){
            alert('แก้ไขชุดข้อสอบเรียบร้อยแล้ว');
            window.location.href = "/TDCS/exam/managePapers";
        },
        error: function(){
            alert('เกิดข้อผิดพลาด');
        }
    });
}

function randomQuestion(){

    var randEasy = $("#randEasy").val();
    var randNormal = $("#randNormal").val();
    var randHard = $("#randHard").val();

    if(randEasy == ""? randEasy = 0: randEasy =  $("#randEasy").val());
    if(randNormal == ""? randNormal = 0: randNormal = $("#randNormal").val());
    if(randHard == ""? randHard = 0: randHard = $("#randHard").val());

    $.ajax({
        url: context+"/TDCS/exam/randomQuestions",
        type: "POST",
        data: {
            randEasy: randEasy,
            randNormal: randNormal,
            randHard: randHard
        },
        success: function(data){
            if(data.length == 0){
                dataNotFound();
            }
            else{
                dataFound();
                $("#questionNotFound").hide();
                $("#checkQuestionAll").attr('checked', false);
                $("#tbSelectedQuestionToPaper").show();
                $("#tbodySelectedQuestionToPaper").empty();

                data.forEach(function(value){
                    //new
                    var createDate = new Date(value.createDate);
                    var dateFormat = createDate.getDate() +" "+ getMonthFormat(Number(createDate.getMonth()) + 1) +" "+ createDate.getFullYear();

                    var str = "";
                    if(value.choices != null){
                        var i = 1;
                        (value.choices).forEach(function(value2){
                            if(Number(value.status.id) == 3){
                                str = str +'<td style="display: none;"><label id="labelChoice'+i+value.id+'">'+value2.description+'</td>'+
                                    '<td style="display: none;"><label id="labelChoiceCorrection1'+value.id+'">'+value2.correction.value+'</td>';
                            }
                            i = i+1;
                        });
                    }
                    //

                    $("#tbodySelectedQuestionToPaper").append(
                        '<tr>'+
                        '<td style="display: none;"><label id="labelQuestionId'+value.id+'">'+value.id+'</td>'+

                            //new
                        '<td style="display: none;"><label id="labelCreateDateId'+value.id+'">'+value.createDate+'</td>'+
                        str+
                            //

                        '<td style="text-align: center;"><input class="selectedQuestion" name="selectQ" type="checkbox"/></td>'+
                        '<td style="text-align: center;"><label id="labelQuestionTypeDesc'+value.id+'">'+value.questionType.description+'</td>'+
                        '<td style="text-align: left;"><label id="labelCategoryName'+value.id+'">'+value.subCategory.category.name+'<label></td>'+
                        '<td style="text-align: left;"><label id="labelSubCategoryName'+value.id+'">'+value.subCategory.name+'</label></td>'+
                        '<td style="text-align: left;"><label id="labelQuestionDesc'+value.id+'">'+value.description+'</label></td>'+
                        '<td style="text-align: center;"><label id="labelDiffDesc'+value.id+'">'+value.difficultyLevel.description+'</td>'+
                        '<td><input id="newScore'+value.id+'" onchange="scoreOnChange()" name="newScore" type="number" class="form-control innput-sm"  min="1" max="50" value="'+value.score+'"/></td>'+

                        '<td style="text-align: center;"><label id="labelQuestionCreateBy'+value.id+'">'+value.createBy.thFname+" "+value.createBy.thLname+'</td>'+
                        '<td style="display: none;"><label id="labelQuestionCreateDate'+value.id+'">'+value.createDate+'</td>'+

                        '</tr>'
                    );

                    sumScore(value.score);
                    $("#score").val(sumPaperScore);
                });
            }
            sumPaperScore = 0;

            questionsInPaper = [];
            $("#tbodySelectedQuestionToPaper tr input:checkbox").each(function(){
                var qId = $(this).parent().siblings().map(function(){
                    return $(this).text();
                }).get(0);
                questionsInPaper.push(qId);
            });
        },
        error: function(){
            alert('ไม่พบข้อสอบ');
        }
    });
}

function showQuestionInfo(qId){
    $("#categoryDetail").text($("#labelCategoryName"+qId).text());
    $("#subCategoryDetail").text($("#labelSubCategoryName"+qId).text());
    $("#createByDetail").text($("#labelQuestionCreateBy"+qId).text());
    $("#createDateDetail").text($("#labelCreateDateId"+qId).text());
    $("#questionTypeDetail").text($("#labelQuestionTypeDesc"+qId).text());
    $("#difficultyDetail").text($("#labelDiffDesc"+qId).text());
    $("#scoreDetail").text($("#labelScore"+qId).text());
    $("#questionDescDetail").text($("#labelQuestionDesc"+qId).text());


    if(Number($("#labelQuestionTypeId"+qId).text()) == 1){
        $("#choiceDetailContainer").show();
        for(var j = 1; j < 5; j ++ ){
            if($("#labelChoiceCorrection"+j+qId).text() == 1 ){
                $("#choiceDetail"+j).text($("#labelChoice"+j+qId).text());
            }
            else{
                $("#choiceDetail"+j).text($("#labelChoice"+j+qId).text());
                $("#correctDetail"+j).hide();
            }
        }
    }
    else{
        $("#choiceDetailContainer").hide();
    }
}

function getMonthFormat(monthNumber) {

    var sqlDate = "";
    var month = "";

    switch (monthNumber) {
        case 01 :
            month = 'ม.ค.';
            break;
        case 02 :
            month = 'ก.พ.';
            break;
        case 03 :
            month = 'มี.ค.';
            break;
        case 04 :
            month = 'เม.ย.';
            break;
        case 05 :
            month = 'พ.ค.';
            break;
        case 06 :
            month = 'มิ.ย.';
            break;
        case 07 :
            month = 'ก.ค.';
            break;
        case 08 :
            month = 'ส.ค.';
            break;
        case 09 :
            month = 'ก.ย.';
            break;
        case 10 :
            month = 'ต.ค.';
            break;
        case 11 :
            month = 'พ.ย.';
            break;
        case 12 :
            month = 'ธ.ค.';
            break;
        default:
            alert('ไม่มีเดือน');
    }
    sqlDate = month;

    return sqlDate;
}
