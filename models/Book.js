const mongoose = require('mongoose');
const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    writtenIn: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});
module.exports = mongoose.model('Book', schema);