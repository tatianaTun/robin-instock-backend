require('dotenv').config();
const express = require('express');
const app = express();
const warehouseRoutes = require('./routes/warehouse-routes');

const PORT = process.env.PORT || 5050;

// Middlewares
app.use(express.json());

// API Routes
app.use('/api/warehouses', warehouseRoutes);

// API index
app.get('/', async (req, res) => {
    res.send('Welcome to my API');
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});