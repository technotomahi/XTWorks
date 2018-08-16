var express=require('express');
var router = express.Router();
var MongoClient=require('mongodb').MongoClient;

var database=require('../../config/database');
var url=database.url;

router.get('/',function(req,res,next){
  MongoClient.connect(url,function(err,db){
    if(err)
    throw err;
    console.log("Connected to database");
    var dbdatabase=db.db('training');
    var hotelcollection=dbdatabase.collection('hotels');
    hotelcollection.find({}).toArray()
  });

});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('hotellist',{
    title:'Chuck Wagon',
    hotelslist:hotellist
  })
});


router.get('/hotelsbycity', function(req, res, next) {
  var city=req.query.city;
  console.log(city);
  var newhotellist=[];
  hotellist.forEach(function(hotel) {
    if(hotel.city==city)
      newhotellist.push(hotel);
    
  });
  res.render('hotellist',{
    title:'Chuck Wagon',
    hotelslist:newhotellist
  })
});



module.exports = router;
