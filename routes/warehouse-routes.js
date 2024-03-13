const warehouseController = require('../controllers/warehouse-controller');
const router = require('express').Router();

router.route('/').post(warehouseController.create);

router.route('/:id').delete(warehouseController.remove);


module.exports = router;