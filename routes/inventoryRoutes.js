const express = require("express").Router();
const inventoryController = require("../controllers/inventoryController");

router.route("/inventories/:id").put(inventoryController.editInventoryById);

module.exports = router;
