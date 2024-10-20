require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const corsOptions = {
  origin: process.env.FRONTEND_URL || '*', // Front-end URL in production
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Placeholder route
const authRoute = require('./routes/auth');
const tasksRoute = require('./routes/tasks');

app.use('/api/auth', authRoute);
app.use('/api/tasks', tasksRoute);

console.log(tasksRoute);  // Add this to see the output


// Connect to MongoDB
const mongoose = require('mongoose');
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose.connect(process.env.MONGO_URI, clientOptions,{
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));


// Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
app.listen(() => {
  console.log('Server running');
});
