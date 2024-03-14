const inventoryController = require('../controllers/inventories-controller')
const router = require('express').Router();

router.route('/').get(inventoryController.index);


module.exports = router;
const inventoriesController = require("../controllers/inventories-controller");

router.route("/").post(inventoriesController.add);
router.route("/:id").put(inventoriesController.updateInventoryById);
module.exports = router;
