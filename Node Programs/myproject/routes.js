var express=require("express");
var router=express.Router();

var handler=function(req,res,next)
{
    console.log("Logging for every Path");
    console.log("logged in at "+new Date());
    next();
}

router.use(handler);

router.get("/",function(req,res){
    res.send("Emp FIle");
});



router.get("/home",function(req,res,next){
    console.log("in home");
    next();
    },function(req,res){
    res.send("This is Home Page");
    }); 

router.get("/contact",function(req,res){
        console.log("in contact");
        res.send("Contact us @ Shristi")
        
        });

router.get("/details/:name/:city",function(req,res){
    var name=req.params.name;
    var city=req.params.city;
    console.log("in details");
    res.send("Welcome  "+name+"  city  "+city);
});

module.exports=router;