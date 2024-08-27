//index.js file
const express = require('express');
const app = require('./app.js');
const { MongoClient } = require('mongodb');
//const port = 3000;

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to DATABASE
//const DATABASE_URL = "mongodb://127.0.0.1:27017/";
//const DATABASE_NAME = "tomato";
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/";
const DATABASE_NAME = process.env.DATABASE_NAME || "tomato";
const port = process.env.PORT || 3000;

const connectDB = async () => {
  let client;

  try {
    client = await MongoClient.connect(DATABASE_URL);

    console.log('Connected to database');
    
    const db = client.db(DATABASE_NAME);

    // Pass the db connection to the app
    app.locals.db = db;

    // Start Server
    app.listen(port, () => console.log(`App listening on port ${port}!`));

  } catch (err) {
    console.error('Failed to connect to the database:', err);
  }
};

connectDB();

