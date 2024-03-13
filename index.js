const express = require('express');
const app = express();
require("dotenv").config();
app.use(express.json());

const PORT = process.env.PORT || 5050;

const warehouseRoutes = require('./routes/warehouse-routes');

app.use('/api/warehouses', warehouseRoutes);

app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
  });