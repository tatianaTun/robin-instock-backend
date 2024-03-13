const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");

router.route("/").get(warehouseController.index);
router.route("/:id").get(warehouseController.getWarehousesById);

module.exports = router;
