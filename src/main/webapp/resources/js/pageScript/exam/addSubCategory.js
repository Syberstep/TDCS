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

    var dat = $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/addSubCategory",
        data: {
            categoryId: categoryId,
            subcategoryNameadd: subcategoryNameadd
        },
        success: function (xhr) {
            //alert('เพิ่มหัวข้อเรื่อง ' + subcategoryNameadd);
            alert("บันทึกข้อมูลสำเร็จ");
            //$("#tbodySubCategory").empty();
            //viewSubCategory();
            window.location.reload();

        },
        error: function (xhr) {
            if(xhr.status == 418){
                alert('บันทึกข้อมูลไม่สำเร็จ : หัวข้อเรื่องนี้มีอยู่แล้วในระบบ');
            }
        }
        //.responseText;
    });
}