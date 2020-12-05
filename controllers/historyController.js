const History = require('../models/History');
const Book = require('../models/Book');
const User = require('../models/User');

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
        const history = {
            _id: bookHistory._id,
            date: bookHistory.date,
            user: await User.findOne({_id: bookHistory.user}),
            book: await Book.findOne({_id: bookHistory.book})
        }
        res.status(200).json({success: true, history});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};

// Create a history
exports.history_post = async (req, res) => {
    // Is the provided book id valid
    const bookExists = await Book.find({_id: req.body.book});
    if (!bookExists) return res.status(400).json({success: false, message: 'Invalid book'})

    // Does the provided user exists
    const userExists = await User.find({user: req.body.user});
    if (!userExists) return res.status(400).json({success: false, message: 'Invalid user'})

    // Are dates valid
    const difference = req.body.date.to - req.body.date.from;
    if (difference <= 0) return res.status(400).json({success: false, message: 'Invalid dates'});

    const schema = History({
        book: req.body.book,
        user: req.body.user,
        date: {
            from: req.body.date.from,
            to: req.body.date.to
        }
    });
    try {
        const history = await schema.save();
        res.status(200).json({success: true, history});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
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
