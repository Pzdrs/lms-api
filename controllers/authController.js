const bcrypt = require('bcryptjs');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const PasswordResetToken = require('../models/PasswordResetToken');
const {createToken, createRefreshToken} = require('../helpers/tokens');
const {sendPassResetEmail} = require('../helpers/mail');
const {nanoid} = require('nanoid');

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
    const user = await User.findOne({username: req.body.username});
    if (user) return res.status(409).json({success: false, message: 'This username is not available.'})
    await User.create({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
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
        .cookie('refresh_token', await createRefreshToken(req, user.id), {httpOnly: true, secure: true})
        .json({
            success: true,
            message: `Welcome back, ${user.username}.`,
            token: createToken(user.id),
            user
        });
};

// Log out user
exports.logout = async (req, res) => {
    if (!req.cookies.refresh_token) return res.status(400).json({success: false, message: 'Refresh token not found.'});
    try {
        res.status(200)
            .cookie('refresh_token', 'asdf', {maxAge: 0, httpOnly: true, secure: true})
            .json({
                success: true,
                message: 'Successfully logged out.'
            });
    } catch (err) {
        console.log(err)
        res.status(500).json({success: false, message: 'Could not log you out.'});
    }
};

exports.logoutAll = async (req, res) => {
    if (!req.cookies.refresh_token) return res.status(400).json({success: false, message: 'Refresh token not found.'});
    try {
        const tokens = await RefreshToken.deleteMany({user: req.params.user});
        res.status(200)
            .cookie('refresh_token', 'asdf', {maxAge: 0, httpOnly: true, secure: true})
            .json({
                success: true,
                message: `Successfully logged out ${tokens.length} devices.`
            });
    } catch (err) {
        console.log(err)
        res.status(500).json({success: false, message: 'Could not log you out.'});
    }
};

exports.forgot_password = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (user) {
            await PasswordResetToken.deleteMany({email: req.body.email});
            const token = nanoid(64);
            await PasswordResetToken.create({
                value: token,
                email: req.body.email
            });
            sendPassResetEmail(req.body.email, token);
        }
    } catch (err) {
        res.status(500).json({success: false, message: err})
    }
    res.status(200).json({success: true, message: `Email has been sent to ${req.body.email}.`})
};

exports.reset_password = async (req, res) => {
    try {
        const token = await PasswordResetToken.findOne({value: req.body.token});
        if (token) {
            await PasswordResetToken.findByIdAndDelete(token._id);
            let user = await User.findOne({email: token.email});
            user.password = req.body.password;
            await user.save();
        } else {
            return res.status(500).json({success: false, message: 'Invalid reset token.'})
        }
    } catch (err) {
        console.error(err);
    }
    res.status(200).json({success: true, message: 'Successfully changed password.'})
};

