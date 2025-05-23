// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://manishkatiyar:NFeq0KYVcGCvMznT@cluster0.a69kixm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const uri = process.env.MONGO_URI;

const dbName = "Backend"; // replace with your DB name

mongoose.set('strictQuery', true); // optional, to avoid deprecation warnings

const connectDB = async () => {
  try {
    if (!uri) {
      throw new Error("MongoDB URI is not defined. Please set MONGO_URI in your .env file.");
    }

    await mongoose.connect(uri, {
      dbName: dbName,
    });
    console.log("Connected to MongoDB via Mongoose!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); 
  }
};
export default connectDB;


