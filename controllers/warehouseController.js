const knex = require("knex")(require("../knexfile"));

const getWarehousesById = async (req, res) => {
  try {
    const warehouseIdFound = await knex("warehouses").where({
      id: req.params.id,
    });

    if (warehouseIdFound.length === 0) {
      return res
        .status(404)
        .json({ message: `Warehouse with ID ${req.params.id} not found` });
    }
    const warehouseData = warehouseIdFound[0];
    res.json(warehouseData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve warehouse data with ID ${req.params.id}`,
    });
  }
};

module.exports = {
  getWarehousesById,
};
