const { MongoClient} = require("mongodb");

// Replace the placeholder with your Atlas connection string
const uri = "mongodb://localhost:27017";

// Create a MongoClient
const client = new MongoClient(uri);

//Database Name
const dbName="Testing";

const user={
    name:"Adeel",
    city:"Kohat",
    Age:25
}
const user2={
    name:"Khan",
    city:"Kohat",
    Age:20
}


async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    const db=client.db(dbName);
    const collection = db.collection("Users");

    //Write operation

//     const result = await collection.insertOne(user2);
//     console.log(
//     `A document was inserted with the _id: ${result.insertedId}`,
// );

    //Read operation
    // const result
    // = await collection.findOne({ name: "Adeel" });
    // console.log(result);

    //Update operation
    // await collection.updateOne(
    //     { name: "Adeel" },{ $set:  { city: "Peshawar" } }
    // );

    //Delete operation
    await collection.deleteOne({ name: "Adeel" });
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
