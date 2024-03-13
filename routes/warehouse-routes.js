const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");

router.route("/:id").get(warehouseController.getWarehousesById);

module.exports = router;
