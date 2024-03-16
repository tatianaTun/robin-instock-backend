const knex = require('knex')(require('../knexfile'));
// Get list of inventories
const index = async (req, res) => {
  try {
      // select inventories and join warehouses to get warehouse_name
      const inventories = await knex('inventories')
          .join('warehouses', 'warehouses.id', 'inventories.warehouse_id')
          .select("inventories.id","warehouse_name","item_name","description","category","status","quantity");
      res.status(200).json(inventories);
  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
}

const add = async (req, res) => {
  if (
    !req.body.warehouse_id ||
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity
  ) {
    return res.status(400).json({
      message:
        "Please provide values for all fields: warehouse_id, item_name, description, category, status and quantity",
    });
  } else if (Number.isNaN(Number(req.body.quantity))) {
    return res.status(400).json({
      message: "Please provide a valid number for quantity",
    });
  }
  try {
    const warehouseItem = await knex("warehouses").where({
      id: req.body.warehouse_id,
    });
    if (warehouseItem.length === 0) {
      return res.status(400).json({
        message: `Warehouse with ID ${req.body.warehouse_id} does not exist`,
      });
    }
    const result = await knex("inventories").insert(req.body);
    const newInventoryId = result[0];
    const createdInventory = await knex("inventories").where({
      id: newInventoryId,
    });
    res.status(201).json(createdInventory);
  } catch (error) {
    res.status(500).json({
      message: `Unable to add item to inventory }: ${error}`,
    });
  }
};
const updateInventoryById = async (req, res) => {
  if (
    !req.body.warehouse_id ||
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity
  ) {
    return res
      .status(400)
      .json({ message: "Please fill out all required information" });
  } else if (Number.isNaN(Number(req.body.quantity))) {
    return res.status(400).json({
      message: "Please provide a valid number for quantity",
    });
  }
  try {
    const warehouse = await knex("warehouses").where({
      id: req.body.warehouse_id,
    });
    if (!warehouse) {
      return res.status(400).json({
        message: `Warehouse ID ${req.params.warehouse_id} does not exist`,
      });
    }
    const inventoryUpdated = await knex("inventories")
      .where({
        id: req.params.id,
      })
      .update(req.body);
    if (inventoryUpdated === 0) {
      return res
        .status(404)
        .json({ message: `Inventory with ID ${req.params.id} not found` });
    }
    const updatedRow = await knex("inventories").where({
      id: req.params.id,
    });
    res.status(200).json(updatedRow[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update inventory with ID ${req.params.id}: ${error}`,
    });
  }
};
module.exports = {
  add,
  updateInventoryById,
  index
};