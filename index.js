const express = require('express');
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 5050;
const inventoriesRoutes = require('./routes/inventories-routes');
app.use(express.json());
// all inventories routes
app.use('/inventories', inventoriesRoutes);

app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
  }); 