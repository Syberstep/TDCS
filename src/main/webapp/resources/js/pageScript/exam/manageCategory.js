$("#dropdownExamEmp").attr('class', 'dropdown-toggle active');

$(document).ready(function(){


    viewCategory();
    $("#deleteCategory").on('click', function(){
        deleteCategory();
    });
    $("#submitCreateCategoryBtn").on('click', function(){
        saveCategory();
    });


    $(".selectCheckbox").on('click',function(){
        $("#selectAllCheckbox").prop('checked',false);
    });
    $("#selectAllCheckbox").prop('checked',false);
    $("#selectAllCheckbox").on('click', function () {
        if (this.checked) {
            $(".selectCheckbox").each(function () {
                this.checked = true;
            })
        }
        else {
            $(".selectCheckbox").each(function () {
                this.checked = false;
            })
        }
    });

    //$("#selectAllSubCategory").checked=false;


    //$(".selectCheckbox").on('click',function(){
    //    $("#selectAllCheckbox").checked =true;
    //    alert("check");
    //
    //});



    $("#addCategory").on('click', function(){
        $("#categoryIdText").val("");
        $("#categoryNameText").val("");

    });


});
function viewCategory(){

    $("#tbodyCategory").empty();
    $("#thEdit").text("แก้ไข");
    var data = $.ajax({
        type: "POST",
        contentType: "application/json",
        url: context+"/TDCS/exam/getAllCategory",
        async: false,
        success: function(data){
            data.forEach(function(value){
                $("#tbodyCategory").append(
                    '<tr>'+
                    '<td class="col-sm-1" style="text-align: center;"><input class="selectCheckbox" type="checkbox" cateId="'+value.id+'"/></td>'+
                    '<td class="col-sm-2" style="text-align: center;"><label id="id'+value.id+'">'+value.id+'</label>'+
                    '<input id="editId'+value.id+'" class="form-control" type="text" value="'+value.id+'" style="display: none;">'+
                    '<td><label id="data'+value.id+'">'+value.name+'</label>'+
                    '<input id="editData'+value.id+'" class="form-control" type="text" value="'+value.name+'" style="display: none;">'+
                    '</td>'+
                    '<td class="col-sm-1" style="text-align: center;"><button id="editBtn'+value.id+'" class="btn btn-gray btn-sm" onclick="editCategory(' + "'" + value.id + "'" + ')"><span class="glyphicon glyphicon-pencil"></span></button>'+
                    '&nbsp;<button id="updateBtn'+value.id+'" class="btn btn-primary btn-sm" style="display: none;" onclick="updateCategory(' + "'" + value.id + "'" + ')"><span class="glyphicon glyphicon-pencil"></span></button></td>'+
                        //'<td style="text-align: center;"><button class="btn btn-danger" id="deleteBtn'+value.id+'" type="button" onclick="deleteCategory('+ "'" +value.id+ "'"+')"><span class="glyphicon glyphicon-trash"></span></button></td>'+
                    '</tr>'
                )
            });
        },
        error: function(data){
            alert('error while request...');
        }
    });
}

function deleteCategory(){
    if(!confirm(" ยืนยันการลบข้อมูล ")){
        return false;
    }
    var catId;
    $("#tblCategory input:checkbox:checked").each(function(){
        catId = $(this).parent().siblings(":first").text();
        $.ajax({
            type: "POST",
            url: context+"/TDCS/exam/deleteCategory",
            data: {
                catId : catId
            },
            success: function(){

                alert("ลบข้อมูลสำเร็จ");
                window.location.reload();
            },
            error: function(){
                alert("ลบข้อมูลไม่สำเร็จ");

            }
        });
    });
}
function editCategory(categoryId){

    $("#editBtn"+categoryId).hide();
    $("#data"+categoryId).hide();
    $("#thEdit").text("บันทึก");
    $("#editData"+categoryId).show();
    $("#updateBtn"+categoryId).show();
}

function updateCategory(categoryId){

    if($("#editData"+categoryId).val() == ""){
        alert("ชื่อหมวดหมู่ต้องไม่เป็นค่าว่าง")
    }
    else{
        var id = $("#id"+categoryId).text();
        var name = $("#editData"+categoryId).val();
        var dataResponse = $.ajax({
            type: "POST",
            url: context+"/TDCS/exam/editCategory",
            data: "id="+id+"&name="+name,
            complete: function (xhr) {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        alert("แก้ไขข้อมูลสำเร็จ");
                        //viewCategory();
                        window.location.reload();
                    }
                    else {
                        alert("แก้ไขข้อมูลไม่สำเร็จ");
                    }
                } else {
                    alert("แก้ไขข้อมูลไม่สำเร็จ");
                }
            }
        });
    }
}

function saveCategory(){
    var countError = 0;
    var elementFirst;
    var element = [ $("#categoryIdText"), $("#categoryNameText")];
    //if($("#password").val()!=$("#cpassword").val()){
    //    $("#password").val("");
    //    $("#cpassword").val("");
    //}
    for(var i=0;i<element.length;i++){
        if(element[i].val()==""){
//            alert(element[i].val()+"~~~"+element[i].selector);
            countError++;
            if(countError==0){
                elementFirst = element[i].selector;
            }
            element[i].attr('style','border:solid 1px red');
        }else{
            element[i].attr('style','');
        }
    }
    if(countError>0){
//        alert(elementFirst);
//        $("#btnSubmit").click();
        alert("กรุณากรอกข้อมูล");
        return false;
    }


    ///////////////////////

    var categoryName = $("#categoryNameText").val();
    var categoryId = $("#categoryIdText").val();

    var data = $.ajax({
        type: "POST",
        contentType: "application/json",
        url: context+"/TDCS/exam/getAllCategory",
        async: false,
        success: function (data) {
            data.forEach(function (value) {
                if (Number($("#categoryIdText").val()) == Number(value.id) && $("#categoryNameText").val() == value.name) {
                    alert("รหัสหมวดหมู่ " + $("#categoryId").val() + ", หมวดหมู่ " + $("#categoryNameText").val() + " มีอยู่แล้วในระบบ");
                }
                if (Number($("#categoryIdText").val()) == Number(value.id)) {
                    //alert("รหัสวิชา "+$("#categoryId").val()+" ซ่ำ");
                    alert("รหัสหมวดหมู่ " + $("#categoryId").val() + " มีอยู่แล้วในระบบ");
                }
                if(categoryId == value.id){
                    alert("รหัสหมวดหมู่ " + $("#categoryIdText").val() + " มีอยู่ในระบบ");
                }
                if ($("#categoryNameText").val() == value.name) {
                    alert("หมวดหมู่ " + categoryName + " มีอยู่แล้วในระบบ");
                }

                //if (categoryName == value.name && categoryId == value.id) {
                //    alert("เหมือนหมด");
                //}
            });

            if($("#categoryIdText").val() == "" || $("#categoryNameText").val() == ""){

                alert("hi there..");
            }

            var dat = $.ajax({
                type: "POST",
                url: context+"/TDCS/exam/addCategory",
                data: 'id=' + categoryId + '&name=' + categoryName,
                success: function () {
                    //alert('เพิ่มวิชา ' + categoryName + ' สำเร็จ ');
                    alert("บันทึกข้อมูลสำเร็จ");
                    window.location.reload();
                },
                error: function () {
                    alert('บันทึกข้อมูลไม่สำเร็จ');
                }
                //}).responseText;
            });
        },
        error: function (data) {
            alert('error while request...');
        }
    });

    //$("#categoryNameText").val("");
    //$("#categoryIdText").val("");
}





$("#categoryName").keyup(function (e) {
    if (e.which > 0) {
        e.preventDefault();
        listcat();
    }
});
function listcat() {
    //alert("LOV");
    var availableall = [];
    var categoryId = $("#categoryName").val();

    var data = $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/getAllCategory",

        async: false,

        success: function (data) {
            data.forEach(function (value) {
                availableall.push(value.id + ' : ' + value.name);
            });
            //alert("SUCC");
        },
        error: function (data) {
            alert('error while request...');
        }
    });

    var search = $("#categoryName").val();
    $("#categoryName").typeahead('destroy').typeahead({
        source: availableall,
        minLength: 0,
        items: 20,
        maxLength: 2
    }).focus().val("").keyup().val(search);

};

