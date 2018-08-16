var MongoClient = require("mongodb").MongoClient;
var url='mongodb://localhost:27017/';

MongoClient.connect(url,function(err,db){
    var dbdatabase=db.db("training");
    console.log("Connected to database");
    var collection=dbdatabase.collection("hotels");
    console.log("Created a new collection");

    // var hotel={
    //     name:'keys',
    //     cuisine:['chinese','indian'],
    //     city:'Bangalore',
    //     rating:8
    // }
    // collection.insertOne(hotel,function(err){
    //     if(err)
    //     {
    //         console.log(err.message);
    //     }
    //     else
    //     {
    //         console.log("inserted one document");
    //     }
    // });

    // var hotellist=[{
    //     name:'keys',
    //     cuisine:['chinese','indian'],
    //     city:'Bangalore',
    //     rating:8
    // },
    //  {
    //      name:'Formula One',
    //      cuisine:['international','indian'],
    //      city:'Ballia',
    //      rating:10
    //  }   ]
    // collection.insertMany(hotellist,function(err){
    //     if(err)
    //     {
    //         console.log(err.message);
    //     }
    //     else
    //     {
    //         console.log("inserted many document");
    //     }
    // });
    console.log(collection.find({},{city:'Ballia'}).toArray(function(err, result) {
        if (err)
        { 
            console.log(err.message);
        }
        console.log(result);
        db.close();
      }));
});