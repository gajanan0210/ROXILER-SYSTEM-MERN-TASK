// // server/server.js
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const productRoutes = require('./routes/productRoutes');
// const seedRoutes = require('./routes/seedRoutes');

// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use('/api/products', productRoutes);
// app.use('/api/seed', seedRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, console.log(`Server running on port ${PORT}`));


const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', productRoutes);

// Error handling middleware
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
