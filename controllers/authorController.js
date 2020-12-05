const Author = require('../models/Author');

// Get all authors
exports.authors_get = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json({success: true, count: authors.length, authors});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};

// Get author by id
exports.author_get = async (req, res) => {
    try {
        const author = await Author.find({_id: req.params.id});
        res.status(200).json({success: true, author});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};

// Create new author
exports.author_post = async (req, res) => {
    const schema = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        born: req.body.born,
        died: req.body.died
    });
    try {
        const author = await schema.save();
        res.status(200).json({success: true, author});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};

// Update author
exports.author_patch = async (req, res) => {
    try {
        const author = await Author.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false});
        res.status(200).json({success: true, author});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};

// Delete author
exports.author_delete = async (req, res) => {
    try {
        const author = await Author.findOneAndDelete(req.params.id);
        res.status(200).json({success: true, author});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};