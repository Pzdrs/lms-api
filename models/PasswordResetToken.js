const mongoose = require('mongoose');
const schema = mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 900
    }
});

module.exports = mongoose.model('PasswordResetToken', schema);