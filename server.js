require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const routes = require('./routes');

const app = express();

// Connect to database
connectDB();

// Enhanced CORS - Remove trailing slash!
app.use(cors({
  origin: ["https://career.absheronport.az"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/uploads', express.static('uploads'));
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running ✅' });
});

// Test route to verify API is working
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!',
    timestamp: new Date().toISOString()
  });
});

// Catch all handler for Vercel
app.all('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path 
  });
});

// Export for Vercel
module.exports = app;