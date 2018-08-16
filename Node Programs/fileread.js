var fs=require('fs');
fs.readFile("./user.js",'UTF-8',function(error,contents){
    if(error)
    {
        console.error(error.message);
    }
    console.log(contents);
});
console.log("This will Printed First");