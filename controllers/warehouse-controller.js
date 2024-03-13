const knex = require("knex")(require("../knexfile"));
const validator = require("validator"); //validate emails
const { phone } = require("phone"); // validate phone numbers

const index = async (_req, res) => {
  try {
    const data = await knex("warehouses");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving warehouses: ${err}`);
  }
};

const update = async (req, res) => {
  if (
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email
  ) {
    return res
      .status(400)
      .json({ message: "Please fill out all required information" });
  } else if (!validator.isEmail(req.body.contact_email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }
  //   else if () {
  //     return res.status(400).json({ message: "Invalid phone number" });
  //   }

  try {
    const rowsUpdated = await knex("warehouses")
      .where({ id: req.params.id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
      });
    }

    const updatedWarehouse = await knex("warehouses").where({
      id: req.params.id,
    });

    res.json(updatedWarehouse[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update warehouse with ID ${req.params.id}: ${error}`,
    });
  }
};
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
  index,
  update,
  getWarehousesById,
};
