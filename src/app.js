//app.js file
const express = require("express");
const app = express();
const { ObjectId } = require('mongodb');

// Middleware to parse JSON bodies
app.use(express.json());

// Welcome message route
app.get("/", (req, res) => {
  res.json("Welcome User..");
});

// 1. Get all subscribers from the database
app.get("/subscribers", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const subscribers = await db.collection("tomato").find().toArray();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subscribers" });
  }
});

// 2. Get subscribers' names and subscribed channels from the database
app.get("/subscribers/names", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const subscribers = await db
      .collection("tomato")
      .find({}, { projection: { name: 1, subscribedChannel: 1, _id: 0 } })
      .toArray();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subscribers' names and channels" });
  }
});

// 3. Get a particular subscriber by _id
app.get("/subscribers/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Directly create ObjectId without validation
    const objectId = new ObjectId(id);
    
    const db = req.app.locals.db;
    const subscriber = await db.collection("tomato").findOne({ _id: objectId });
    
    if (!subscriber) {
      return res.status(404).json({ message: `No subscriber found with _id: ${id}` });
    }

    res.json(subscriber);
  } catch (error) {
    // Catch any errors that occur during ObjectId creation or query
    res.status(500).json({ message: `Error fetching subscriber with _id: ${id}`, error: error.message });
  }
});

 
 
// Handles unwanted requests.
app.use((req, res) => {
  res.status(404).json({ message: "Error !! please check the route " });
});

module.exports = app;
