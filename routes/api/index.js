const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const authRouter = require('./auth');
const booksRouter = require('./books');
const historyRouter = require('./history');
const authorsRouter = require('./authors');

const {requireLoggedIn} = require('../../middleware/authentication');

// Sub routes
router.use('/users', requireLoggedIn, usersRouter);
router.use('/auth', authRouter);
router.use('/books', requireLoggedIn, booksRouter);
router.use('/history', requireLoggedIn, historyRouter);
router.use('/authors', requireLoggedIn, authorsRouter);

router.get('/', function (req, res, next) {
    res.send('THE API');
});

module.exports = router;
