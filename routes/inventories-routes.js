const router = require('express').Router();
const inventoriesController = require('../controllers/inventories-controller');


router
  .route("/")
  .post(inventoriesController.add);
  module.exports = router;
