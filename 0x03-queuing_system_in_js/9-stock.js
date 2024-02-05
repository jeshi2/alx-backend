import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

const app = express();
const client = redis.createClient();
const port = 1245;

// Sample product data
const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 },
];

// Function to get an item by its ID
const getItemById = (id) => listProducts.find((item) => item.itemId === id);

// Function to reserve stock by item ID
const reserveStockById = (itemId, stock) => {
  client.set(`item.${itemId}`, stock);
};

// Async function to get current reserved stock by item ID
const getCurrentReservedStockById = async (itemId) => {
  const getAsync = promisify(client.get).bind(client);
  const reservedStock = await getAsync(`item.${itemId}`);
  return reservedStock ? parseInt(reservedStock, 10) : 0;
};

// Route to get the list of products
app.get('/list_products', (req, res) => {
  res.json(listProducts.map((item) => ({
    itemId: item.itemId,
    itemName: item.itemName,
    price: item.price,
    initialAvailableQuantity: item.initialAvailableQuantity,
  })));
});

// Route to get product details by item ID
app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const item = getItemById(itemId);

  if (!item) {
    res.json({ status: 'Product not found' });
  } else {
    const currentQuantity = item.initialAvailableQuantity - await getCurrentReservedStockById(itemId);
    res.json({
      itemId: item.itemId,
      itemName: item.itemName,
      price: item.price,
      initialAvailableQuantity: item.initialAvailableQuantity,
      currentQuantity: currentQuantity,
    });
  }
});

// Route to reserve a product by item ID
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const item = getItemById(itemId);

  if (!item) {
    res.json({ status: 'Product not found' });
  } else {
    const currentQuantity = item.initialAvailableQuantity - await getCurrentReservedStockById(itemId);

    if (currentQuantity <= 0) {
      res.json({ status: 'Not enough stock available', itemId: itemId });
    } else {
      reserveStockById(itemId, currentQuantity - 1);
      res.json({ status: 'Reservation confirmed', itemId: itemId });
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle unexpected errors
process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

// Handle promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
