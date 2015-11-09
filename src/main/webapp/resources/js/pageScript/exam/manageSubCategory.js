/**
 * Created by JOKIZZ on 17/8/2558.
 */


$("#dropdownExamEmp").attr('class', 'dropdown-toggle active');

$(document).ready(function () {


    $("#alertMess").hide();

    $("#selectAllSubCategory").prop('checked',false);

    $("#selectAllSubCategory").on('click', function () {
        if (this.checked) {
            $(".selectSubCategory").each(function () {
                this.checked = true;
            })
        }
        else {
            $(".selectSubCategory").each(function () {
                this.checked = false;
            })
        }
    });

    $("#addSubcategory").on('click', function(){
        $("#sCat").val("");
        $("#subcategoryNameadd").val("");
    })

    //if($("#categoryId").val()=="") {
    //    $("#sSubCat").append(
    //        '<option value="">' + "เลือกหัวข้อเรื่อง" + '</option>'
    //    )
    //}

    //$("#categoryId").on('change',function(){
    //    $("#sSubCat").append(
    //        '<option value="">' + "เลือกหัวข้อเรื่อง" + '</option>'
    //    )
    //});
});


$("document").ready(function () {
    //alert('hi')
    viewSubCategory();
    $(".selectSubCategory").on('click',function(){

        $("#selectAllSubCategory").prop('checked',false);

    });
});
function viewSubCategory() {
    $("#tbodySubCategory").empty();
    var data = $.ajax({
        type: "POST",
        contentType: "application/json",
        url: context+"/TDCS/exam/getAllSubCategory",
        async: false,
        success: function (data) {
            data.forEach(function (value) {
                $("#tbodySubCategory").append(
                    '<tr>' +

                        //'<td style="text-align: center;"><label id="catId'+value.id+'"><b>'+value.id+'</b></label>'+
                    '<td style="text-align: center;"><input class="selectSubCategory" type="checkbox" subCatId="' + value.subId + '"></input>' +

                        //'<input id="id'+value.id+'" class="form-control" type="text" value="'+value.id+'" style="display: none;">'+

                    '<td style="text-align: left;"><label id="catName' + value.id + '">' + value.name + '</label>' +

                    '</td>' +

                        //'<td style="text-align: center;"><label id="subId'+value.subId+'"><b>'+value.subId+'</b></label>'+

                    '<td style="text-align: left;"><label id="subName' + value.subId + '">' + value.subName + '</label>' +
                    '<input id="editsubName' + value.subId + '" class="form-control" type="text" value="' + value.subName + '" style="display: none;">' +


                    '<td style="text-align: center">' +
                    '<button id="editBtn' + value.subId + '" type="button" class="btn btn-gray btn-sm" onclick="editSubCategory(' + "'" + value.subId + "'" + ')"><span class="glyphicon glyphicon-pencil"></span></button>' +
                    '&nbsp;<button id="updateBtn' + value.subId + '" class="btn btn-primary" style="display: none;" onclick="updateSubCategory(' + "'" + value.subId + "'" + ')"><span class="glyphicon glyphicon-pencil"></span></button></td>' +

                    '</td>' +

                        //'<td style="text-align: center">'+
                        //'<button class="btn btn-danger" type="button" onclick="deleteSubCategory('+ "'" +value.subId+ "'"+')"> <span class="glyphicon glyphicon-trash"></span></button>'+
                        //'</td>'+
                    '</tr>'
                )
            });
            var data = $.ajax({
                type: "POST",
                contentType: "application/json",
                url: context+"/TDCS/exam/getAllSubCategory",
                async :false,
                success: function (data) {
                    $("#sSubCat").append(
                        '<option value="" ></option>'
                    )
                    data.forEach(function (value) {
                        $("#sSubCat").append(
                            '<option >' + value.subName + '</option>'
                        )
                    });

                },
                error :function(data){

                }


            });
        },
        error: function (data) {
            alert('error while request...');
        }
    });
}


function deleteSubCategory(subCategoryId) {
    if (!confirm(" ยืนยันการลบข้อมูล ")) {
        return false;
    }
    $("#tbodySubCategory input:checkbox:checked").each(function () {
        //categoryIds.push($(this).parent().siblings(":first").text());
        var subCategoryId = ($(this).attr('subCatId'));
        //alert (subCategoryId);
        $.ajax({
            type: "POST",
            url: context+"/TDCS/exam/deleteSubCategory",
            data: {
                id: subCategoryId
            },
            async: false,
            success: function () {
                //$("#tbodySubCategory").empty();
                //viewSubCategory();

            },
            error: function () {
                //alert('ไม่สามารถลบ ' + subCategoryId + ' ได้');
                alert("ลบข้อมูลไม่สำเร็จ");
            }
        });
    })
    alert(' ลบข้อมูลสำเร็จ ');

    window.location.reload();
}

function editSubCategory(subcategoryId) {

    $("#editBtn" + subcategoryId).hide();
    $("#subName" + subcategoryId).hide();
    //$("#data"+subcategoryId).hide();


    $("#editsubName" + subcategoryId).show();
    $("#thEdit").text("บันทึก");
    $("#updateBtn" + subcategoryId).show();
}


function updateSubCategory(subcategoryId) {

    //if ($("#editsubName" + subName).length > 5) {
    //    alert("คุณกรอกรหัสวิชาไม่ถูกต้อง");
    //}
    //else if ($("#editData" + categoryId).val() == "") {
    //    alert("ชื่อวิชาต้องไม่เป็นค่าว่าง")
    //}
    //else {
    //    var id = $("#editId" + categoryId).val();


    var subName = $("#editsubName" + subcategoryId).val();

    if (subName == "") {
        alert("ไม่สามารถเป็นค่าว่างได้");
    }
    //if (subName==$("#editsubName")){
    //    alert("ชื่อซ้ำ");
    //}
    //alert($("#id"+subcategoryId));


    //alert(subcategoryId + ' ' + subName);

    var dataResponse = $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/editSubCategory",
        data: {
            subcategoryId: subcategoryId,
            subcategoryName: subName
        },
        complete: function (xhr) {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    //viewSubCategory();
                    alert("แก้ไขข้อมูลสำเร็จ");
                    window.location.reload();
                }
                else {
                    alert("ชื่อซ้ำ");
                }
            } else {
                alert("แก้ไขข้อมูลไม่สำเร็จ");
            }
        }
    });
}

$(document).ready(function () {
    $("#searchSubCategory").on('click', function () {
        search();
    });
    $("#clearsearchinput").on('click', function () {
        clearsearch();
    });
});

function clearsearch() {
    //window.location.reload();
    $("#categoryId").val("");
    $("#sSubCat").empty();
}

function search() {
    var categoryId = $("#categoryId").val();
    var subcategoryName = $("#sSubCat").val();
    var length = $("#categoryId").val().length;
    categoryId += " ";
    categoryId = categoryId.substr(0, categoryId.indexOf(' '));
    //alert(categoryId);


    var dataResponse = $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/searchSubCategory",
        data: {
            categoryId: categoryId,
            subcategoryName: subcategoryName
        },
        async: false,
        success: function (data) {
            $("#tbodySubCategory").empty();
            if (data.size == null) {
                $("#alertMess").show();
            }


            data.forEach(function (value) {
                //$("#tbodySubCategory").empty();
                console.log(value.SubCategory.name);
                $("#alertMess").hide();
                $("#tbodySubCategory").append(
                    '<tr>' +

                    '<td style="text-align: center;"><input class="selectSubCategory" type="checkbox" subCatId="' + value.SubCategory.id + '"> </input>' +

                        //'<input id="id'+value.id+'" class="form-control" type="text" value="'+value.id+'" style="display: none;">'+
                    '<td style="text-align: left;"><label id="catName' + value.id + '">' + value.category.name + '</label>' +
                    '</td>' +

                        //'<td style="text-align: center;"><label id="subId'+value.subId+'"><b>'+value.subId+'</b></label>'+

                    '<td style="text-align: left;"><label id="subName' + value.SubCategory.id + '">' + value.SubCategory.name + '</label>' +
                    '<input id="editsubName' + value.SubCategory.id + '" class="form-control" type="text" value="' + value.SubCategory.name + '" style="display: none;">' +


                    '<td style="text-align: center">' +
                    '<button id="editBtn' + value.SubCategory.id + '" type="button" class="btn btn-gray btn-sm" onclick="editSubCategory(' + "'" + value.SubCategory.id + "'" + ')"><span class="glyphicon glyphicon-pencil"></span></button>' +
                    '&nbsp;<button id="updateBtn' + value.SubCategory.id + '" class="btn btn-primary" style="display: none;" onclick="updateSubCategory(' + "'" + value.SubCategory.id + "'" + ')"><span class="glyphicon glyphicon-pencil"></span></button></td>' +

                    '</td>' +

                        //'<td style="text-align: center">' +
                        //'<button class="btn btn-danger" type="button" onclick="deleteSubCategory('+ "'" +value.SubCategory.id+ "'"+')"> <span class="glyphicon glyphicon-trash"></span></button>'+
                        //'</td>' +
                    '</tr>'
                )

            });

        },
        error: function () {
            alert("error");
        }
    })
}



/////////////////////////////////////////////LOV+++++

$("#categoryId").keyup(function (e) {
    if (e.which > 0) {
        e.preventDefault();
        listsubcat();
    }
});
function listsubcat() {
    //alert("LOV");
    var availableall = [];
    var categoryId = $("#categoryId").val();

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
    var search = $("#categoryId").val();
    $("#categoryId").typeahead('destroy').typeahead({
        source: availableall,
        minLength: 0,
        items: 20,
        maxLength: 2
    }).focus().val('').keyup().val(search);
};







//$(document).ready(function () {


$("#categoryId, #selectCategoryToSelection, #selectCategoryToSelectionForRandom").on('change', function () {
        $("#sSubCat").empty();
        var categoryId = $("#categoryId").val();
        //var categoryName = $("#categoryId").val();
        var subcategoryName = $("#sSubCat").val();
        //categoryId += " ";
        //var length = categoryId.length
        //alert(length);

        //categoryId = categoryId.substr(0, categoryId.indexOf(' '));
        if(categoryId.trim() !=""){
            if(categoryId.indexOf(':')!=-1){
                categoryId.indexOf(':');
                var categoryId2 =  categoryId.substr(0, categoryId.indexOf(' '));
                categoryId = categoryId2;
                var data = $.ajax({
                    type: "POST",
                    url: context+"/TDCS/exam/getSubCategoryToDropDown",
                    data: {
                        categoryId: categoryId
                        //subcategoryName: subcategoryName
                    },
                    async: false,

                    success: function (data) {
                        data.forEach(function (value) {
                            $("#sSubCat").append(
                                '<option >' + value.SubCategory.name + '</option>'
                            )
                        });
                    },
                    error: function (data) {
                        alert('error while request...');
                    }
                });
                if (($("#sSubCat").val() == null)) {
                    $("#sSubCat").append(
                        '<option value="">' + "ไม่มีหัวข้อเรื่องภายใต้หมวดหมู่นี้" + '</option>'
                    )
                }
                else if (($("#sSubCat").val() != null)) {
                    $("#sSubCat").prepend(
                        '<option value="" selected></option>'
                    )
                }
            }else{
                //console.log(categoryId+" 1 part");

                var data = $.ajax({
                    type: "POST",
                    url: context+"/TDCS/exam/getSubCategoryToDropDown",
                    data: {
                        categoryId: categoryId
                        //subcategoryName: subcategoryName
                    },
                    async: false,

                    success: function (data) {
                        data.forEach(function (value) {
                            $("#sSubCat").append(
                                '<option >' + value.SubCategory.name + '</option>'
                            )
                        });

                    },
                    error: function (data) {
                        alert('error while request...');
                    }

                });
                if (($("#sSubCat").val() == null)) {
                    $("#sSubCat").append(
                        '<option value="">' + "ไม่มีหัวข้อเรื่องภายใต้หมวดหมู่นี้" + '</option>'
                    )
                }
                else if (($("#sSubCat").val() != null)) {
                    $("#sSubCat").prepend(
                        '<option value="" selected></option>'
                    )
                }
            }
        }else{

            var data = $.ajax({
                type: "POST",
                contentType: "application/json",
                url: context+"/TDCS/exam/getAllSubCategory",
                async :false,
                success: function (data) {
                    $("#sSubCat").append(
                        '<option value="" ></option>'
                    )
                    data.forEach(function (value) {
                        $("#sSubCat").append(
                            '<option >' + value.subName + '</option>'
                        )
                    });

                },
                error :function(data){

                }


            });

        }
    }
)












