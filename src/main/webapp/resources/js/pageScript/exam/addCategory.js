function saveCategory(){
    //alert("hi");

    //$('#addCategoryForm').bootstrapValidator({
    //    container: '#messages',
    //    feedbackIcons: {
    //        valid: 'glyphicon glyphicon-ok',
    //        invalid: 'glyphicon glyphicon-remove',
    //        validating: 'glyphicon glyphicon-refresh'
    //    },
    //    fields:{
    //        catId:{
    //            validators: {
    //                notEmpty: {
    //                    message: 'ssssssssssssss'
    //                }
    //            }
    //        },
    //        catName:{
    //            validators: {
    //                notEmpty: {
    //                    message: 'aaaaaaaaaa'
    //                }
    //            }
    //        }
    //    }
    //});

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
                    alert("รหัสหมวดหมู่ " + $("#categoryId").val() + ", ชื่อหมวดหมู่ " + $("#categoryNameText").val() + " มีอยู่แล้วในระบบ");
                }
                if (Number($("#categoryIdText").val()) == Number(value.id)) {
                    //alert("รหัสวิชา "+$("#categoryId").val()+" ซ่ำ");
                    alert("รหัสหมวดหมู่ " + $("#categoryId").val() + " มีอยู่แล้วในระบบ");
                }
                if ($("#categoryNameText").val() == value.name) {
                    alert("ชื่อหมวดหมู่ " + $("#categoryName").val() + " มีอยู่แล้วในระบบ");
                }
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
                    alert("บันทึกข้อมูลสำเร็จ")
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

    $("#categoryNameText").val("");
    $("#categoryIdText").val("");
}



