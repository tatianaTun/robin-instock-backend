const knex = require('knex')(require('../knexfile'));

// Get list of inventories
const index = async (req, res) => {
    try {
        const inventories = await knex('inventories');
        res.status(200).json(inventories);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}


module.exports = {
    index,
}