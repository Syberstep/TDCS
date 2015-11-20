var paper;
var asc1 = 1, asc2 = 1, asc3 = 1;

window.onload = function(){
    paper = document.getElementById("tbodyManagePaper");
}

function sortTable(tbody, col, asc){
    alert('hi' + tbody.rows);
    var rows = tbody.rows;
    var rowLength = rows.length;
    var keepArray = new Array();
    var j;
    var cells;
    var cellLength;

    for(var i = 0; i < rowLength; i++){
        cells = rows[i].cells;
        keepArray[i] = new Array();
        for(var j = 0; j < cellLength; j ++){
            keepArray[i][j] = cells[j].innerHTML;
        }
    }

    keepArray.sort(function(a, b){
        return (a[col] == b[col])? 0 : ((a[col] > b[col]) ? asc : -1 * asc);
    });

    for (i = 0; i < rowLength; i++) {
        rows[i].innerHTML = "<td>" + keepArray[i].join("</td><td>") + "</td>";
    }
}