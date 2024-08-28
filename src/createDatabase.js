const { MongoClient } = require('mongodb');
const data = require('./data'); // Ensure this file exists and contains the data you want to insert
require('dotenv').config({ path: './src/.env' });


// Connect to MongoDB Atlas
const DATABASE_URL = process.env.DATABASE_URL;  // MongoDB Atlas connection string
const DATABASE_NAME = process.env.DATABASE_NAME;  // Database name 'tomato'
const port = process.env.PORT || 3000;

const refreshAll = async () => {
  let client;

  try {
    // Connect to the MongoDB Atlas server with options
    client = await MongoClient.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });


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

