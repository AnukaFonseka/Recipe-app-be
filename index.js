const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./config/db.config');
const routes = require('./routes/index.routes');
require('dotenv').config();


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectToDatabase();

// Initialize routes
app.use('/', routes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

