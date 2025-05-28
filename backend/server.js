const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Search History Schema
const searchHistorySchema = new mongoose.Schema({
  vehicleNumber: String,
  timestamp: { type: Date, default: Date.now }
});

const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);

// Routes
app.post('/api/challan', async (req, res) => {
  try {
    const { vehicleNumber } = req.body;
    
    // Log search to database
    await SearchHistory.create({ vehicleNumber });
    
    // Dummy challan data
    const challanData = {
      vehicleNumber,
      challanId: `CH${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toISOString(),
      amount: Math.floor(Math.random() * 5000) + 500,
      violation: ['Speeding', 'Signal Jump', 'Parking Violation'][Math.floor(Math.random() * 3)],
      location: ['Main Street', 'Highway 101', 'City Center'][Math.floor(Math.random() * 3)]
    };
    
    res.json(challanData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/history', async (req, res) => {
  try {
    const history = await SearchHistory.find()
      .sort({ timestamp: -1 })
      .limit(5);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 