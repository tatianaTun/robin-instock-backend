require('dotenv').config();
const express = require('express');
const app = express();
const warehouseRoutes = require('./routes/warehouse-routes');
const inventoryRoutes = require('./routes/inventories-routes');

const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());

// API Routes
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/inventories', inventoryRoutes);

// API index
app.get('/', async (req, res) => {
    res.send('Welcome to my API');
});

const inventoriesRoutes = require("./routes/inventories-routes");
const warehouseRoutes = require("./routes/warehouse-routes");
// all inventories routes
app.use("/inventories", inventoriesRoutes);
// all warehouses routes
app.use("/warehouses", warehouseRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
