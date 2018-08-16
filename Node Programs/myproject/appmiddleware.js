var express=require("express");
var app=express();

var logger=function(req,res,next)
{
    console.log("logged for path "+req.url);
    console.log("Logged in at "+new Date());
    next();
}

app.use(logger);

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.get("/home",function(req,res,next){
    console.log("in home");
    next();
    },function(req,res){
    res.send("This is Home Page");
    }); 

app.get("/contact",function(req,res){
        console.log("in contact");
        res.send("Contact us @ Shristi")
        
        });

app.get("/details/:name/:city",function(req,res){
    var name=req.params.name;
    var city=req.params.city;
    console.log("in details");
    res.send("Welcome  "+name+" city"+city);
});

app.listen('3000',function(){
    console.log("Listening to port 3000");
});