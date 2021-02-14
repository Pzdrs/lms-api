const mongoose = require('mongoose');
const schema = mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId, // Book id
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // User id
        required: true
    },
    returned: {
        type: Boolean,
        default: false
    },
    date: {
        from: {
            type: Date,
            default: Date.now
        },
        to: {
            type: Date,
            required: true
        }
    }
})
module.exports = mongoose.model('History', schema, 'history');