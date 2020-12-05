const bcrypt = require('bcryptjs');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const {createToken, createRefreshToken} = require('../helpers/tokens');

// Revoke a refresh token
exports.revoke_refresh_token = async (req, res) => {
    // Is refresh token cookie present?
    //if (!req.cookies.refresh_token) res.status(400).json({success: false, message: 'Refresh token not found.'})

};

// Create new access token
exports.refresh_token = async (req, res) => {
    // Is refresh token cookie present?
    if (!req.cookies.refresh_token) return res.status(400).json({success: false, message: 'Refresh token not found.'})
    try {
        const token = await RefreshToken.findOne({value: req.cookies.refresh_token});
        if (!token) return res.status(410).json({success: false, message: 'Refresh token invalid.'})
        // Is refresh token expired?
        if (Date.now() > new Date(token.expires).valueOf())
            return res.status(400).json({
                success: false,
                message: 'Refresh token expired.'
            });
        res.status(200).json({
            success: true,
            token: createToken(token.user),
            user: await User.findOne({_id: token.user})
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, message: err.message});
    }
};

// Create user
exports.signup = async (req, res) => {
    // Create a new user
    await User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }, (err, user) => {
        if (err) return res.status(409).json({success: false, message: err.message});
        res.status(201).json({success: true, user});
    });
};

// Log in user
exports.login = async (req, res) => {
    const user = await User.findOne().or([{username: req.body.username}, {email: req.body.username}]);
    // Does user exist?
    if (!user) return res.status(401).json({success: false, message: 'There is no user with that username or email.'})

    // Is the password correct?
    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(401).json({success: false, message: 'The specified password is invalid.'});
    }
    res
        .status(200)
        .cookie('refresh_token', await createRefreshToken(req, user.id), {httpOnly: true})
        .json({
            success: true,
            message: `Welcome back, ${user.username}.`,
            token: createToken(user.id),
            user
        });
}
