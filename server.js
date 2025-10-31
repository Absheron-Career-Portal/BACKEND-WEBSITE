// require('dotenv').config(); 

// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/database');
// const routes = require('./routes');

// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// app.use('/uploads', express.static('uploads'));
// app.use('/api', routes);

// app.get('/health', (req, res) => {
//   res.status(200).json({ message: 'Server is running' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const routes = require('./routes');

const app = express();

connectDB();

// Enhanced CORS configuration
app.use(cors({
  origin: [
    "https://career.absheronport.az",
    "http://localhost:3000" // for local testing
  ],
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

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running ✅' });
});

// Export for Vercel
module.exports = app;