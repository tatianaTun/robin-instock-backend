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

const findOne = async (req, res) => {
    try {
        const record = await knex('inventories').where({ id: req.params.id }).first();
        if (!record) {
            return res.status(404).json({ message: "Inventory not found" });
        }

        res.status(200).json(record);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

module.exports = {
    index,
    findOne,
}