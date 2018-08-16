var express=require("express");
var app=express();

app.get("/home",function(req,res,next){
    console.log(new Date());
    next();
    },function(req,res){
    res.send("Home Page Welcomes");
    }); 

var handler1=function(request,response,next){
    console.log("first handler");
    next();
}

var handler2=function(request,response,next){
    console.log("second handler");
    next();
}

var handler3=function(request,response,next){
    response.send('<h1>HELLO WORLD</h1>');
}

app.get("/about",[handler1,handler2,handler3]);
app.get("/contact",[handler2,handler3]);

app.get("/combo",[handler1,handler2],function(request,response,next){
    console.log("this is combo");
    next();
},function(request,response){
    response.send("FINAL RESULT");
});

app.get("/add",function(request,response,next){
    var name=request.query.username;
    if(name='Priya')
    {
        response.send("Welcome Priya");
    }
    else{
        next();
    }
},function(request,response)
{
    response.send("Invalid credentials");
});
app.listen('3000',function(){
    console.log("Listening to port 3000");
});