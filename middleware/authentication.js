const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.requireLoggedIn = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({success: false, message: 'You are not logged in.'});
    try {
        // Verify the token
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        // Invalid token
        res.status(401).json({success: false, message: 'Invalid or expired token.'})
    }
}

exports.requireAdmin = async (req, res, next) => {
    const userId = JSON.parse(Buffer
        .from(req.header('Authorization').split('.')[1], 'base64')
        .toString('binary')
    ).id;
    const user = await User.findById(userId);
    if (user.isAdmin) return next();
    res.status(403).json({success: false, message: 'Not an admin.'})
};

exports.requireLoggedOut = (req, res, next) => {
    if (req.get('Authorization')) return res.status(401).json({success: false, message: 'You are already logged in.'});
    next();
}