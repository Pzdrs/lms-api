const User = require('../models/User');
const History = require('../models/History');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
        const source = jwt.decode(req.headers.authorization);
        const target = req.params.id;
        const sourceUser = await User.findById(source.id);
        if (source.id !== target && !sourceUser.isAdmin)
            return res.status(403).json({
                success: false,
                message: 'You can only update your own information.'
            });
        const user = await User.findById(req.params.id);
        if (req.body.firstName)
            user.firstName = req.body.firstName;
        if (req.body.lastName)
            user.lastName = req.body.lastName;
        if (req.body.password) {
            user.password = await bcrypt.hash(req.body.password, 10);
        }
        await user.save();
        res.status(200).json({success: true, user});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};

// Delete user
exports.user_delete = async (req, res) => {
    try {
        const history = await History.find({user: req.params.id});
        const activeBooks = history.filter(({date}) => new Date(date.to).getTime() > new Date().getTime()).length;
        if (activeBooks > 0) return res.status(500).json({
            success: true,
            message: `Cannot delete this account, due to it still having ${activeBooks} active books.`
        })

        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({success: true, user});
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
};