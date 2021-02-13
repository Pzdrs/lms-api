const express = require('express');
const router = express.Router();
const utils = require('../../helpers/utils');

const Book = require('../../models/Book');
const User = require('../../models/User');

const usersRouter = require('./users');
const authRouter = require('./auth');
const booksRouter = require('./books');
const historyRouter = require('./history');
const authorsRouter = require('./authors');

const {requireLoggedIn} = require('../../middleware/authentication');

// Sub routes
router.use('/users', requireLoggedIn, usersRouter);
router.use('/auth', authRouter);
router.use('/books', booksRouter);
router.use('/history', historyRouter);
router.use('/authors', authorsRouter);

router.get('/', (req, res, next) => {
    res.send('THE API');
});

router.get('/statistics', async (req, res, next) => {
    try {
        res.status(200).json({
            success: true, statistics: {
                booksTotal: await Book.countDocuments({}),
                booksInUse: await utils.booksInUse(),
                users: await User.countDocuments({})
            }
        })
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
});

module.exports = router;
