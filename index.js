import express from 'express';
import { readFile } from 'fs/promises';
import cors from 'cors';

const app = express();
const port = 3000;

// Read and parse the JSON file
const rawData = JSON.parse(
  await readFile(new URL('./listing.json', import.meta.url))
);

// Access the array of products inside the object
const products = rawData;

app.use(cors({
  origin: '*',
}));

// Get all products
app.get('/product', (req, res) => {
  res.json(products);  // Send the array of products
});

// Get a product by ID
app.get('/product/:id', (req, res) => {
  const productId = req.params.id;  // Get product ID from URL
  const product = products.find(p => p.id === productId);  // Use find() on the array

  if (product) {
    res.json(product);  // Return product if found
  } else {
    res.status(404).json({ message: 'Product not found' });  // Return 404 if not found
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
