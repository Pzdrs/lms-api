const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');
const RefreshToken = require('../models/RefreshToken');

function createToken(id) {
    return jwt.sign({id, ttl: 3600}, process.env.JWT_SECRET, {expiresIn: '1h'});
}

async function createRefreshToken(req, id) {
    const token = crypto.randomBytes(64).toString('base64');
    try {
        const savedToken = await RefreshToken.create({
            value: token,
            user: id,
            expires: moment().add(7, 'd').toDate(),
            createdByIp: req.ip
        });
        return savedToken.value;
    } catch (err) {
        console.error(err);
        return null;
    }
}

module.exports = {
    createToken,
    createRefreshToken
}
