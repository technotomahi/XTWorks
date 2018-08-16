var express = require('express');
var router = express.Router();
var data=require('../hotels.json');
var hotellist=data.hotels;


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
