var MongoClinet = require('mongodb').MongoClient;

var database=require('../../../config/database');
var url=database.url;

MongoClient.connect(url,function(err,db){
  if(err)
  {
    throw err;
  }
  console.log("connected to database");
  var dbdatabase=db.db("training");
  var hotelcollection= dbdatabase.collection("hotels");
  module.exports=hotelcollection;
});
