const mongoose = require('mongoose');
const schema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    born: {
        type: Date,
        required: true
    },
    died: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('author', schema);