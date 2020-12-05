const express = require('express');
const router = express.Router();
const controller = require('../../controllers/authorController');

// Get all authors
router.get('/', controller.authors_get);

// Sometimes get the correct err message, sometimes just an empty array.
// Get author by id
router.get('/:id', controller.author_get);

// Crete author
router.post('/', controller.author_post);

// Update author
router.patch('/:id', controller.author_patch);

// Delete author
router.delete('/:id', controller.author_delete);

module.exports = router;