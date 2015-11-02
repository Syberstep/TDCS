/**
 * Created by Phuthikorn_T on 21/10/2558.
 */

$('.doExamBtn').on('click',function(){
    var confirmation = confirm('เมื่อเริ่มทำข้อสอบแล้วออกจากหน้าระบบจะทำการบันทึกข้อมูลทันทีและจะไม่สามารถทำข้อสอบนี้ได้อีก \nต้องการที่จะทำข้อสอบหรือไม่')
    if(confirmation){
        location.href = $(this).attr("location");
    }
})