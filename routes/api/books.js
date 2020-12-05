const router = require('express').Router();
const {body} = require('express-validator');
const controller = require('../../controllers/bookController');

// Get all books
router.get('/', controller.get_books);

// Get book by id
router.get('/:id', controller.get_book);

// Get a more detailed book
router.get('/:id/extended', controller.get_book_extended);

// Create book
router.post('/', [
    body('title', 'You must provide the title').isString(),
    body('isbn', 'You must provide the ISBN').isString(),
    body('author', 'You must provide the author (as an ObjectId)').isMongoId(),
    body('pageCount', 'You must provide the number of pages (as a Number)').isInt().not().isString(),
    body('writtenIn', 'You must provide the written in field (as a Date)').isInt().not().isString()
], controller.create_book);

// Update book
router.patch('/:id', controller.update_book);

// Delete book
router.delete('/:id', controller.delete_book);

module.exports = router;