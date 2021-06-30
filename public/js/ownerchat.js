

// To SCroll Div at bottom

var x = document.getElementById("length");


for(var i = 0; i<x.value; i++)
{
    var objDiv = document.getElementById("check"+i);
    objDiv.scrollTop = objDiv.scrollHeight;
}


