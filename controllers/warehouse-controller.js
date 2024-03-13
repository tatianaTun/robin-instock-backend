const knex = require('knex')(require('../knexfile'));

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

module.exports = {
    create,
    remove,
}