const knex = require('knex')(require('../knexfile'));
const validator = require("validator"); //validate emails
const { phone } = require("phone"); // validate phone numbers
// Create a new warehouse
const create = async (req, res) => {
    // Validation for request body
    if (!req.body.warehouse_name ||
        !req.body.address ||
        !req.body.city ||
        !req.body.country ||
        !req.body.contact_name ||
        !req.body.contact_position) {
        return res.status(400).json({ message: "Please provide all data fileds" });
    }
    // validation for contact_phone
    if (!req.body.contact_phone) {
        return res.status(400).json({ message: "Please enter a valid phone contact" });
    }
    // validation for contact_email
    if (!req.body.contact_email) {
        return res.status(400).json({ message: "Please enter a valid email address" });
    }
    try {
        const result = await knex('warehouses').insert(req.body);
        console.log('Inserted result: ', result);
        const rowId = result[0]
        const newWarehouse = await knex('warehouses').where({ id: rowId });
        res.status(201).json(newWarehouse);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
// Delete a warehouse
const remove = async (req, res) => {
    try {
        const deletedRows = await knex('warehouses').where({ id: req.params.id }).delete();
        if (deletedRows === 0) {
            return res.status(404).json({ message: "Warehouse not found" });
        }
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
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
const inventories = async (req, res) => {
  try {
    const inventories = await knex("inventories")
      .where({ warehouse_id: req.params.id })
      .select("id", "item_name", "category", "status", "quantity"); // Specify only the columns we want
    if (inventories === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
      });
    }
    res.json(inventories);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve inventories for warehouse with ID ${req.params.id}: ${error}`,
    });
  }
};
module.exports = {
  index,
  update,
  inventories,
  getWarehousesById,
  create,
  remove,
};