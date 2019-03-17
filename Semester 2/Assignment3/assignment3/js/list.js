// Data for the "HTML Lists" Page

var fruits = [ "Apples","Oranges","Pears","Grapes","Pineapples","Mangos" ];

var directory = [
    {type: "file", name: "file1.txt"},
    {type: "file", name: "file2.txt"},
    {type: "directory", name: "HTML Files", files: [{type: "file", name: "file1.html"},{type: "file", name: "file2.html"}]},
    {type: "file", name: "file3.txt"},
    {type: "directory", name: "JavaScript Files", files: [{type: "file", name: "file1.js"},{type: "file", name: "file2.js"},{type: "file", name: "file3.js"}]}
];

window.onload = function(){
var container1 = document.querySelector("#container1");
var temp1 = "<ol>";
for(var i = 0; i < fruits.length; i++)
{
   temp1 += "<li>" + fruits[i] + "</li>";
   
}
temp1 += "</ol>";
container1.innerHTML = temp1;




    var container2 = document.querySelector("#container2");
    var temp2 = "<ul>";
    for(var i = 0; i < directory.length; i++)
    {
       temp2 += "<li>" + directory[i].name + "</li>";
       if(directory[i].type == "directory")
       {
        temp2 += "<ul>";
           for(var j = 0; j < directory[i].files.length; j++)
           {
            temp2 += "<li>" + directory[i].files[j].name + "</li>";
           }
           temp2 += "</ul>";
       }
       
    }
    temp2 += "</ul>";
    container2.innerHTML = temp2;
    
};