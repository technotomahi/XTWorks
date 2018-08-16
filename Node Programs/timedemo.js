console.log("hello world");

setTimeout(function()
{
    console.log('print after 1 sec');
},1000);

console.log('welcome to node');

setInterval(function(){
    console.log('task A');
},10);

setInterval(function(){
    console.log('task B');
},10);