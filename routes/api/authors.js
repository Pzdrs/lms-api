const express = require('express');
const router = express.Router();
const controller = require('../../controllers/authorController');
const {requireLoggedIn, requireAdmin} = require('../../middleware/authentication');


// Get all authors
router.get('/', controller.authors_get);

// Sometimes get the correct err message, sometimes just an empty array.
// Get author by id
router.get('/:id', controller.author_get);

// Crete author
router.post('/', requireLoggedIn, requireAdmin, controller.author_post);

// Update author
router.patch('/:id', requireLoggedIn, requireAdmin, controller.author_patch);

// Delete author
router.delete('/:id', requireLoggedIn, requireAdmin, controller.author_delete);

module.exports = router;