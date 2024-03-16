require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
// Middlewares
app.use(express.json());
// API index
app.get('/', async (req, res) => {
    res.send('Welcome to my API');
});
const inventoriesRoutes = require("./routes/inventories-routes");
const warehouseRoutes = require("./routes/warehouse-routes");
// all inventories routes
app.use("/api/inventories", inventoriesRoutes);
// all warehouses routes
app.use("/api/warehouses", warehouseRoutes);
app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});