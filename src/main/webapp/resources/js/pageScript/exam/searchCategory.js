/**
 * Created by wanchana on 18/8/2558.
 */

$(document).ready(function(){

   $("#categoryId").val('');
   $("#categoryName").val('');
   $("#searchNotFound").hide();
   $("#searchCategory").click(function(){
       search();
   });
   $("#resetBtnSearchCategory").on('click', function(){
       $("#categoryId").val('');
       $("#categoryName").val('');
   })
});

function search(){

    var categoryIdRequest = $("#categoryName").val();
    //var categoryNameRequest = $("#categoryName").val();
    categoryIdRequest +=' ';
    categoryIdRequest =categoryIdRequest.substr(0,categoryIdRequest.indexOf(' '));

    //categoryNameRequest = categoryNameRequest.substr(8);
    //alert(categoryIdRequest+'--'+categoryNameRequest);
    //alert(categoryIdRequest);

    var data = $.ajax({
        type: "POST",
        url: context+"/TDCS/exam/searchCategory",
        data: {
            id: categoryIdRequest
        },
        async: false,
        success: function(data){
            $("#tbodyCategory").empty();
            if(data.size == null){
                $("#searchCatNotFound").show();
            }
            data.forEach(function(value){
                $("#searchCatNotFound").hide();
                $("#tbodyCategory").append(
                    '<tr>'+
                    '<td class="col-sm-1" style="text-align: center;"><input type="checkbox" cateId="'+value.category.id+'"/></td>'+
                    '<td class="col-sm-2" style="text-align: center;"><label id="id'+value.category.id+'">'+value.category.id+'</label>'+
                    '<input id="editId'+value.category.id+'" class="form-control" type="text" value="'+value.category.id+'" style="display: none;">'+
                    '<td><label id="data'+value.category.id+'">'+value.category.name+'</label>'+
                    '<input id="editData'+value.category.id+'" class="form-control" type="text" value="'+value.category.name+'" style="display: none;">'+
                    '</td>'+
                    '<td class="col-sm-1" style="text-align: center;"><button id="editBtn'+value.category.id+'" class="btn btn-gray btn-sm" onclick="editCategory(' + "'" + value.category.id + "'" + ')"><span class="glyphicon glyphicon-pencil"></span></button>'+
                    '&nbsp;<button id="updateBtn'+value.category.id+'" class="btn btn-primary btn-sm" style="display: none;" onclick="updateCategory(' + "'" + value.category.id + "'" + ')"><span class="glyphicon glyphicon-pencil"></span></button></td>'+
                    '</tr>'
                )
            });
        },
        error: function(){
            alert("error");
        }
    })
}