const router = require('express').Router();

const warehouseController = require('../controllers/warehouse-controller');

router.route('/').post(warehouseController.create);


module.exports = router;
