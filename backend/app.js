// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// --- Configuration ---
// (Best practice: store sensitive data like DB URLs in environment variables)
// We'll use dotenv to load them from a .env file
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/myDatabase';

// --- Initialize Express App ---
const app = express();

// --- Middleware ---
// 1. Enable CORS (Cross-Origin Resource Sharing)
// This allows your frontend (running on a different domain) to make requests to this backend
app.use(cors());

// 2. Enable JSON body parsing
// This allows the server to accept and parse JSON data in request bodies
app.use(express.json());
app.use("/api/trains", require("./src/controllers/trainController"));

// --- Routes ---
// Example "Hello World" route
app.get('/', (req, res) => {
  res.send('Hello from your Express server!');
});

// (You would add your API routes here, e.g., app.use('/api/users', userRoutes))

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});