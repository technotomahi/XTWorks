exports.add =function(number1,number2){
dontExportThis();
return parseInt(number1,10)+parseInt(number2,10);
}
exports.multiply =function(number1,number2){
dontExportThis();
return parseInt(number1,10)*parseInt(number2,10);
}
exports.message ='hello world';
dontExportThis =function(){
console.log("calculator");
}  