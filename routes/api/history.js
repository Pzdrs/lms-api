const router = require('express').Router();
const controller = require('../../controllers/historyController');

// List all history
router.get('/', controller.history_get);

// Get a specific history
router.get('/:id', controller.history_details_get);

// Get a specific history detailed
router.get('/:id/extended', controller.history_details_extended_get);

// Create a history
router.post('/', controller.history_post);

// Edit a history
router.patch('/:id', controller.history_patch);

// Delete history
router.delete('/:id', controller.history_delete);

module.exports = router;