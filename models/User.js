const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    registeredAt: {
        type: Date,
        default: Date.now
    }
});

// Hash passwords
schema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
module.exports = mongoose.model('User', schema);