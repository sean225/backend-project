//createDatabase.js file
const { MongoClient } = require('mongodb');
const data = require('./data'); // Ensure this file exists and contains the data you want to insert

// Connect to DATABASE
//const DATABASE_URL = "mongodb://127.0.0.1:27017/";
//const DATABASE_NAME = "tomato";
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/";
const DATABASE_NAME = process.env.DATABASE_NAME || "tomato";
const port = process.env.PORT || 3000;

const refreshAll = async () => {
  let client;

  try {
    // Connect to the MongoDB server
    client = await MongoClient.connect(DATABASE_URL);

    console.log('Database connected...');

    const db = client.db(DATABASE_NAME);
    const collection = db.collection('tomato'); // Use the correct collection name

    // Clear existing data
    await collection.deleteMany({});

    // Insert new data
    await collection.insertMany(data);

    console.log('Database refreshed with new data.');

  } catch (err) {
    console.error('Error during database operations:', err);
  } finally {
    // Close the connection
    if (client) {
      await client.close();
      console.log('Database disconnected...');
    }
  }
};

refreshAll();
