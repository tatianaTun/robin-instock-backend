const knex = require("knex")(require("../knexfile"));

const updateInventoryById = async (req, res) => {
  const { warehouse_id, item_name, description, category, status, quantity } =
    req.body;

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
      .json({ message: "Please provide all required information" });
  }

  try {
    const inventoryUpdated = await knex("inventory")
      .where({
        id: req.params.id,
      })
      .update(req.body);

    if (inventoryUpdated === 0) {
      return res
        .status(404)
        .json({ message: `Inventory with ID ${req.params.id} not found` });
    }
    const updatedRow = await knex("inventory").where({
      id: req.params.id,
    });
    res.json(updatedRow[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update inventory with ID ${req.params.id}: ${error}`,
    });
  }
};
module.exports = {
  updateInventoryById,
};
