var express=require("express");
var app=express();

var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :false}));  

app.get("/",function(request,response){
    response.send("welcome to Express");
});

app.get("/home",function(request,response){
    response.send("This is Home Page");
});

app.get("/getDetails/:empname",function(request,response){
    var empName=request.params.empname;
    response.send("WELCOME TO NODE WORLD "+empName);
});

app.get("/details/:name/:city",function(request,response){
    var name=request.params.name;
    var city=request.params.city;
    response.send("Welcome "+name+" to "+city);
});

app.get("/add",function(request,response)
{
    var name=request.query.username;
    var id=request.query.userid;
    var user={name:name,uid:id};
    response.send(JSON.stringify(user));

});

app.post("/postdata",function(request,response)
{
    var name=request.body.username;
    var id=request.body.userid;
    var user={name:name,uid:id};
    response.send(JSON.stringify(user));

});

app.listen('3000',function(){
    console.log("Listening to port 3000");
});
