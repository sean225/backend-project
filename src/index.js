const express = require('express');
const app = require('./app.js');
const { MongoClient } = require('mongodb');

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Environment variables
const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;
const port = process.env.PORT || 3000;

let client;

const connectDB = async () => {
  try {
    // Connect to the MongoDB Atlas server with options
    client = await MongoClient.connect(DATABASE_URL);


    console.log('Connected to database');

    const db = client.db(DATABASE_NAME);

    // Pass the db connection to the app
    app.locals.db = db;

    // Start Server
    app.listen(port, () => console.log(`App listening on port ${port}!`));

  } catch (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1); // Exit the process if the database connection fails
  }
};

// Graceful shutdown
const gracefulShutdown = () => {
  if (client) {
    client.close()
      .then(() => {
        console.log('Database connection closed');
        process.exit(0);
      })
      .catch(err => {
        console.error('Error closing database connection:', err);
        process.exit(1);
      });
  } else {
    process.exit(0);
  }
};

// Listen for termination signals (e.g., SIGINT, SIGTERM) to handle graceful shutdown
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

connectDB();



