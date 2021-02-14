const History = require('../models/History');
const Book = require('../models/Book');
const User = require('../models/User');
const Author = require('../models/Author');

// Get all the history
exports.history_get = async (req, res) => {
    try {
        const history = await History.find();
        res.status(200).json({success: true, count: history.length, history});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};

// Get a single history
exports.history_details_get = async (req, res) => {
    try {
        const history = await History.find({_id: req.params.id});
        res.status(200).json({success: true, history});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};

// Get a single history detailed
exports.history_details_extended_get = async (req, res) => {
    try {
        const bookHistory = await History.findOne({_id: req.params.id});
        const book = await Book.findOne({_id: bookHistory.book});
        const history = {
            _id: bookHistory._id,
            user: bookHistory.user,
            book: {
                title: book.title,
                writtenIn: book.writtenIn,
                pageCount: book.pageCount,
                isbn: book.isbn,
                author: await Author.findOne({_id: book.author}),
            },
            date: bookHistory.date,
            returned: bookHistory.returned
        }
        res.status(200).json({success: true, history});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};

// Create a history
exports.history_post = async (req, res) => {
    await History.create({
        book: req.body.book,
        user: req.body.user,
        date: {
            to: new Date(req.body.to * 1000)
        }
    })
        .then(history => {
            res.status(200).json({success: true, history});
        })
        .catch(err => {
            res.status(500).json({success: false, err});
        });
};

// Update a history
exports.history_patch = async (req, res) => {
    try {
        const history = await History.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false});
        res.status(200).json({success: true, history});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};

//  Delete a history
exports.history_delete = async (req, res) => {
    try {
        const history = await History.findOneAndDelete(req.params.id);
        res.status(200).json({success: true, history});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};
