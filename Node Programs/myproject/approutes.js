var express=require("express");
var app=express();

var routes=require("./routes");
app.use("/empApp",routes);

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.listen('3000',function(){
    console.log("Listening to port 3000");
});