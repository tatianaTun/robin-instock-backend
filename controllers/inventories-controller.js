const knex = require('knex')(require('../knexfile'));


const add = async (req, res) => {
    if (!req.body.warehouse_id || !req.body.item_name || !req.body.description || !req.body.category || !req.body.status || !req.body.quantity) {

        return res.status(400).json({
            message: "Please provide values for all fields",
        });
    } else if (Number.isNaN(Number(req.body.quantity))) {
        return res.status(400).json({
            message: "Please provide a valid number for quantity",
        });
    }

    try {
        const warehouseItem = await knex("warehouses")
            .where({ id: req.body.warehouse_id });

        if (warehouseItem.length === 0) {
            return res.status(400).json({
                message: `Warehouse with ID ${req.body.warehouse_id} does not exist`
            });
        }

        const result = await knex("inventories").insert(req.body);

        const newInventoryId = result[0];
        const createdInventory = await knex("inventories").where({ id: newInventoryId });

        res.status(201).json(createdInventory);
        console.log(result, newInventoryId, createdInventory)
    } catch (error) {
        res.status(500).json({
            message: `Unable to add item to inventory }: ${error}`
        });

    }
};
module.exports = {

    add,

};