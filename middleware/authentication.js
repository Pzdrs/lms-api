const jwt = require('jsonwebtoken');

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

exports.requireLoggedOut = (req, res, next) => {
    if (req.get('Authorization')) return res.status(401).json({success: false, message: 'You are already logged in.'});
    next();
}