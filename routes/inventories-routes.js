const router = require('express').Router();
const inventoriesController = require('../controllers/inventories-controller');

// router.route('/').get(userController.index);
// router.route("/:id").get(userController.findOne);
// router.route("/:id/posts").get(inventoriesController.posts);
router
  .route("/")
  .post(inventoriesController.add);
  module.exports = router;
