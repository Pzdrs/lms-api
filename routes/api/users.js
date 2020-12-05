const router = require('express').Router();
const controller = require('../../controllers/userController');

// Get all users
router.get('/', controller.users_get);

// Get user by id
router.get('/:id', controller.user_get);

// Update user
router.patch('/:id', controller.user_patch);

// Delete user
router.delete('/:id', controller.user_delete);

module.exports = router;
