var paperCodes = new Array();
var orderPaperByColumn;
var orderPaperType;

$("#orderPaperByColumn").on('change', function(){
    getPaperIds();
    orderPaperByColumn = $("#orderPaperByColumn").val();
    orderPaperType = $("#orderPaperType").val();
    var temp = new Array();

    for(var i = 0; i < paperCodes.length; i ++){
        var item = {
            "paperCodes" : paperCodes[i]
        };
        temp.push(item);
    }
    orderPaper(temp, orderPaperByColumn, orderPaperType);
});

$("#orderPaperType").on('change', function(){
    getPaperIds();
    orderPaperByColumn = $("#orderPaperByColumn").val();
    orderPaperType = $("#orderPaperType").val();
    var temp = new Array();

    for(var i = 0; i < paperCodes.length; i ++){
        var item = {
            "paperCodes" : paperCodes[i]
        };
        temp.push(item);
    }
    orderPaper(temp, orderPaperByColumn, orderPaperType);
});

function getPaperIds(){
    paperCodes = [];
    $("#tbodyManagePaper tr td:nth-child(3)").each(function(){
        paperCodes.push($(this).text());
    });
}

function orderPaper(paperCodes, orderPaperByColumn, orderPaperType){
    var jsonString = {};
    jsonString = JSON.stringify(paperCodes);
    $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/orderPaper",
        data: {
            "paperCodes": jsonString,
            "orderPaperByColumn": orderPaperByColumn,
            "orderPaperType": orderPaperType
        },
        async: false,
        success: function(data){
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
                    //url: context+"/TDCS/exam/checkExamPaperInUse",
                    url: context+"/TDCS/exam/checkExamPaperIfMarkConfirmed",
                    type: "POST",
                    data: {
                        paperId: value.id
                    },
                    async: false,
                    success: function(check){

                    }
                }).responseText;

                var str1 = "";
                var str2 = "";
                if(check == 'true') {
                    str1 = "disabled";
                    str2 = "disabled";
                }

                if((check == 'false') && (value.paperStatus.id != 1)){
                    checkAll = checkAll + 1;
                }

                if(value.paperStatus.id == 1){
                    str1 = "disabled";
                    str2 = "";
                }

                $("#tbodyManagePaper").append(
                    '<tr>'+
                    '<td style="display: none;"><label id="'+value.id+'">'+value.id+'</label></td>'+
                    '<td class="pCheck"><input class="checkPaper" '+str1+' type="checkbox" check="'+check+'"/></td>'+
                    '<td><label id="lpaperCode'+value.code+'">'+value.code+'</label></td>'+
                    '<td style="text-align: left;"><label id="lpaperName'+paperName+'">'+paperName+'</label></td>'+
                    '<td><label id="lpaperCreateBy'+value.createBy.empId+'">'+value.createBy.thFname+' '+value.createBy.thLname+'</label></td>'+
                    '<td><label id="lpaperScore'+value.maxScore+'" class="label-control">'+value.maxScore+'</label></td>'+
                    '<td><label id="lpaperForPosition'+posiId+'" class="label-control">'+posiName+'</label></td>'+
                    '<td class="pSelect">'+
                    '<select id="dropdownId'+value.id+'" name="paperStatus" '+str2+' class="btn btn-success btn-sm" style="text-align: left;">'+
                        //'<option value="3">ยังไม่เผยแพร่</option>'+
                    '<option value="1">เปิดใช้งาน</option>'+
                    '<option value="2">ปิดใช้งาน</option>'+
                    '</select>'+
                    '</td>'+
                    '<td class="pButton"><button id="'+value.id+'" class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-pencil"></span></button></td>'+
                    '</tr>'
                );
                presentStatus(value.id, value.paperStatus.id);
            });
        }
    });
}