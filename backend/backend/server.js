// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Example in-memory product database
let products = [
  { id: 1, name: 'Product 1', price: '100' },
  { id: 2, name: 'Product 2', price: '200' }
];

// ✅ GET all products
app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});

// ✅ POST a new product
app.post('/api/products', (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  const newProduct = { id: Date.now(), name, price };
  products.push(newProduct);

  res.status(201).json(newProduct);
});

// ✅ Use Vercel's port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ✅ Export the Express app (Required for Vercel)
module.exports = app;
