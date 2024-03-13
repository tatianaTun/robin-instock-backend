const knex = require("knex")(require("../knexfile"));

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
  updateInventoryById,
};
