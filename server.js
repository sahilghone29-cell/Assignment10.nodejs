const express = require('express');
require('dotenv').config();

// Initialize Firebase Firestore connection
const db = require('./config/firebase');

// Import User Router
const userRouter = require('./router/userRouter');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON requests
app.use(express.json());

// Basic Root Route to verify server health
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Express.js Server is running successfully',
    assignment: 'Assignment 10 - Store Data in Firebase Firestore Using Express.js',
    student: {
      name: 'Sahil Ghone',
      id: '150096725002'
    }
  });
});

// Mount User Router at /api/users
app.use('/api/users', userRouter);

// Start Server with EADDRINUSE port fallback
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const ALT_PORT = Number(PORT) + 1;
    console.warn(`Port ${PORT} is already in use. Retrying on port ${ALT_PORT}...`);
    app.listen(ALT_PORT, () => {
      console.log(`Server running on http://localhost:${ALT_PORT}`);
    });
  } else {
    console.error('Server error:', err);
  }
});

