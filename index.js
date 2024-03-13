const express = require('express');
const app = express();
require("dotenv").config();
app.use(express.json());

const PORT = process.env.PORT || 5050;

const warehouseRoutes = require('./routes/warehouse-routes');
const inventoriesRoutes = require('./routes/inventories-routes');

// all warehouses routes
app.use('/warehouses', warehouseRoutes);

// all inventories routes
app.use('/inventories', inventoriesRoutes);

app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
  }); 