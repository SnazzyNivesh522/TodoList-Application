require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Placeholder route
app.get('/', (req, res) => {
  res.send('Hello World');
});

const authRoute = require('./routes/auth');
const tasksRoute = require('./routes/tasks');

app.use('/api/auth', authRoute);
app.use('/api/tasks', tasksRoute);

// Connect to MongoDB
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose.connect(process.env.MONGO_URI, clientOptions)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Export the app for serverless deployment
module.exports = app;
