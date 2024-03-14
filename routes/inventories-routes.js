const router = require('express').Router();
const inventoriesController = require("../controllers/inventories-controller");
router.route("/")
.get(inventoriesController.index)
.post(inventoriesController.add);
router.route("/:id")
.put(inventoriesController.updateInventoryById);
module.exports = router;