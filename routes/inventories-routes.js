const inventoryController = require('../controllers/inventories-controller')
const router = require('express').Router();

router.route('/').get(inventoryController.index);
router.route('/:id').get(inventoryController.findOne);

module.exports = router;