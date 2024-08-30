const express = require("express");
const cors = require('cors');
const app = express();
const { ObjectId } = require('mongodb');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Subscriber API',
      version: '1.0.0',
      description: 'API documentation for the Subscriber service',
    },
    servers: [
      {
        url: 'https://backend-project-1-yizw.onrender.com',
      },
    ],
  },
  apis: ['./src/app.js'], // Path to your API routes files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     responses:
 *       200:
 *         description: A welcome message
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Welcome User.."
 */
app.get("/", (req, res) => {
  res.json("Welcome User..");
});

/**
 * @swagger
 * /subscribers:
 *   get:
 *     summary: Get all subscribers
 *     responses:
 *       200:
 *         description: A list of all subscribers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
app.get("/subscribers", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const subscribers = await db.collection("tomato").find().toArray();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subscribers" });
  }
});

/**
 * @swagger
 * /subscribers/names:
 *   get:
 *     summary: Get subscribers' names and subscribed channels
 *     responses:
 *       200:
 *         description: A list of subscribers with their names and subscribed channels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   subscribedChannel:
 *                     type: string
 */
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

/**
 * @swagger
 * /subscribers/{id}:
 *   get:
 *     summary: Get a subscriber by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the subscriber to retrieve
 *     responses:
 *       200:
 *         description: The subscriber with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: No subscriber found with the specified ID
 *       500:
 *         description: Error fetching subscriber
 */
app.get("/subscribers/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const objectId = new ObjectId(id);
    const db = req.app.locals.db;
    const subscriber = await db.collection("tomato").findOne({ _id: objectId });
    
    if (!subscriber) {
      return res.status(404).json({ message: `No subscriber found with _id: ${id}` });
    }

    res.json(subscriber);
  } catch (error) {
    res.status(500).json({ message: `Error fetching subscriber with _id: ${id}`, error: error.message });
  }
});

// Handles unwanted requests.
app.use((req, res) => {
  res.status(404).json({ message: "Error !! please check the route " });
});

module.exports = app;
