const express = require("express").Router();
const warehouseController = require("../controllers/warehouseController");

router.route("/:id").get(warehouseController.getWarehousesById);

module.exports = router;
