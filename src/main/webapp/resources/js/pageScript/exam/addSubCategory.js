//$("document").ready(function(){
//    saveSubCategory();
//    //alert(subcategoryName);
//});



function saveSubCategory() {
    var countError = 0;
    var elementFirst;
    var element = [ $("#subcategoryNameadd"), $("#sCat")];
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



    var categoryId = $("#sCat").val();
    var categoryName = $("#sCat").children(":selected").attr("categoryName");
    var subcategoryNameadd = $("#subcategoryNameadd").val();

    var data = $.ajax({
        type: "POST",
        contentType: "application/json",
        url: context+"/TDCS/exam/getAllSubCategory",
        async: false,
        success: function (data) {
            //alert(subcategoryNameadd);
            data.forEach(function (value) {

            if ($("#subcategoryNameadd").val().length < 1 || categoryName ==null || categoryId =="") {
                alert("คุณกรอกข้อมูลไม่ครบ");
            }
            if (Number($("#categoryId").val()) == Number(value.id) && $("#categoryName").val() == value.name) {
                alert("รหัสหมวดหมู่ " + $("#categoryId").val() + ", หมวดหมู่ " + $("#categoryName").val() + " มีอยู่แล้วในระบบ");
            }
            if (Number($("#categoryId").val()) == Number(value.id)) {
                //alert("รหัสหมวดหมู่ "+$("#categoryId").val()+" ซ่ำ");
                alert("รหัสหมวดหมู่ " + $("#categoryId").val() + " มีอยู่แล้วในระบบ");
            }
            if ($("#subcategoryNameadd").val() == value.subName) {
                alert(" หัวข้อเรื่อง " + $("#subcategoryNameadd").val() + " มีอยู่แล้วในระบบ");
            }


            //if ($("#subcategoryNameadd").val() == "" || $("#categoryId").val() == "") {
            //    alert(" กรุณากรอกข้อมูลให้ครบ ");
            //    //this.xhr.abort();
            //}
            //alert(" not show ")
            });


            var dat = $.ajax({
                type: "POST",
                url: context+"/TDCS/exam/addSubCategory",
                data: {
                    categoryId: categoryId,
                    subcategoryNameadd: subcategoryNameadd
                },
                success: function () {
                    //alert('เพิ่มหัวข้อเรื่อง ' + subcategoryNameadd);
                    alert("บันทึกข้อมูลสำเร็จ");
                    //$("#tbodySubCategory").empty();
                    //viewSubCategory();
                    window.location.reload();

                },
                error: function () {
                    alert('บันทึกข้อมูลไม่สำเร็จ');
                }
                    //.responseText;
            });
        },
        error: function (data) {
            alert('error while request...');
        }
    });
}