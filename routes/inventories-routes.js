const express = require("express").Router();
const inventoryController = require("../controllers/inventories-controller");

router.route("/inventories/:id").put(inventoryController.editInventoryById);

module.exports = router;
