const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize express
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Define Item schema
const itemSchema = new mongoose.Schema({
  name: String,
  sku: String,
  price: Number,
});

// Create Item model
const Item = mongoose.model('Item', itemSchema);

// Add Item route
app.post('/api/items', async (req, res) => {
  try {
    const { name, sku, price } = req.body;
    const newItem = new Item({ name, sku, price });
    await newItem.save();
    res.status(200).json({ message: 'Item added successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add item', error: err });
  }
});

// Search Items by Name or SKU route
app.get('/api/items/search', async (req, res) => {
  try {
    const { query } = req.query;
    const items = await Item.find({
      $or: [
        { name: new RegExp(query, 'i') },
        { sku: new RegExp(query, 'i') },
      ],
    });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to search items', error: err });
  }
});

  



// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
