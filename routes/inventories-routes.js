const inventoryController = require('../controllers/inventories-controller')
const router = require('express').Router();

router.route('/').get(inventoryController.index);


module.exports = router;