const warehouseController = require('../controllers/warehouse-controller');
const router = require('express').Router();

router.route('/').post(warehouseController.create);

router.route('/:id').delete(warehouseController.remove);


module.exports = router;

router.route("/").get(warehouseController.index);

router
  .route("/:id")
  .get(warehouseController.getWarehousesById)
  .put(warehouseController.update);

router
  .route("/:id/inventories")
  .get(warehouseController.inventories)

module.exports = router;
