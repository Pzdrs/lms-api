const Book = require('../models/Book');
const History = require('../models/History');
const Author = require('../models/Author');

// Get all books
exports.get_books = async (req, res) => {
    await Book.find()
        .then(books => {
            res.status(200).json({success: true, count: books.length, books});
        })
        .catch(err => {
            res.status(500).json({success: false, message: err.message});
        });
};

exports.get_books_extended = async (req, res) => {
    try {
        const books = await Book.find();
        let result = []
        for (const book of books) {
            const author = await Author.findById(book['author'])
            const returned = (await History.find({book: book._id, returned: false})).length > 0;
            console.log(returned)
            result.push({
                _id: book._id,
                title: book.title,
                author,
                isbn: book.isbn,
                pageCount: book.pageCount,
                writtenIn: book.writtenIn,
                createdAt: book.createdAt,
                returned: !returned
            })
        }
        res.status(200).json({success: true, count: books.length, books: result});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};

// Get book by id
exports.get_book = async (req, res) => {
    await Book.findOne({_id: req.params.id})
        .then(book => {
            res.status(200).json({success: true, book});
        })
        .catch(err => {
            res.status(500).json({success: false, message: err.message});
        });
};

// Get book by id
exports.get_book_extended = async (req, res) => {
    const book = await Book.findOne({_id: req.params.id});
    const history = await History.find({book: book._id});
    const author = await Author.findOne({_id: book.author});
    try {
        res.status(200).json({
            success: true,
            book: {
                title: book.title,
                author,
                isbn: book.isbn,
                pageCount: book.pageCount,
                writtenIn: book.writtenIn,
                createdAt: book.createdAt,
                history
            }
        });
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};

// Create book
exports.create_book = async (req, res) => {
    await Book.create({
        title: req.body.title,
        isbn: req.body.isbn,
        pageCount: req.body.pageCount,
        author: req.body.author,
        writtenIn: req.body.writtenIn
    }, (err, book) => {
        if (err) return res.status(500).json({success: false, message: err.message});
        res.status(200).json({success: true, book});
    });
};

// Update book
exports.update_book = async (req, res) => {
    await Book.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false})
        .then(book => {
            res.status(200).json({success: true, book});
        })
        .catch(err => {
            res.status(500).json({success: false, message: err.message});
        });
};

// Delete book
exports.delete_book = async (req, res) => {
    await Book.findByIdAndDelete(req.params.id)
        .then(book => {
            res.status(200).json({success: true, book});
        })
        .catch(err => {
            res.status(500).json({success: false, message: err.message});
        });
};