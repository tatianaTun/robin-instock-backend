const router = require('express').Router();

const warehouseController = require('../controllers/warehouse-controller');

router.route('/').post(warehouseController.create);

router.route('/:id').delete(warehouseController.remove);


module.exports = router;
