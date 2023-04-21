
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

const uri = "mongodb+srv://foodyy:aman1909@cluster0.mtgsmow.mongodb.net/gofood?retryWrites=true&w=majority";

//Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    await mongoose.connect(uri);
    // Send a ping to confirm a successful connection
    await client.db("db").command({ ping: 1 });
    console.log("successfully connected");
    const fetched = await mongoose.connection.db.collection("food_items") //it collected or fetched data from collection in database
    //if we want to find any data from collection we use 'find' empty{}=need all data
    
    fetched.find({}).toArray(async function (err, data) {
      const food_category = await mongoose.connection.db.collection("food_category")
      food_category.find({}).toArray(async function (err, catdata) {
        
        if (err) console.log(err);
        else {
          global.food_items = data //we have to send data in frontend through as an end point
          global.food_category = catdata
        }
      })
      // if(err) console.log(err);
      // else {
      //   global.food_items=data //we have to send data in frontend through as an end point


    })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);


