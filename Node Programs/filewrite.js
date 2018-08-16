var fs=require('fs');
fs.writeFile('demo.txt','\n Asynchronous write',{flag:'wx'},
function(error,contents){
    if(error)
    {
        console.error(error.message);
    }
    console.log(contents);
});
console.log("This will Printed First")