const User = require('../models/User');

// Get all users
exports.users_get = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({success: true, users});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};

// Get user by id
exports.user_get = async (req, res) => {
    try {
        const user = await User.find({_id: req.params.id});
        res.status(200).json({success: true, user});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};

// Update user
exports.user_patch = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false});
        res.status(200).json({success: true, user});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};

// Delete user
exports.user_delete = async (req, res) => {
    try {
        const user = await User.findOneAndDelete(req.params.id);
        res.status(200).json({success: true, user});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};