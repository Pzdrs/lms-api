const mongoose = require('mongoose');
const schema = mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    expires: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 604800
    },
    createdByIp: {
        type: String,
        required: true
    },
    revokedAt: {
        type: Date
    },
    revokedByIp: {
        type: String
    },
    replacedBy: {
        type: mongoose.Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('RefreshToken', schema);