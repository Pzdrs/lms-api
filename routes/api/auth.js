const router = require('express').Router();
const controller = require('../../controllers/authController');
const {login, signup} = require('../../middleware/validation');

// Create new access token
router.get('/refresh_token', controller.refresh_token);

// Revoke a refresh token
router.post('/refresh_token/revoke', controller.revoke_refresh_token);

// Create user
router.post('/signup', signup, controller.signup);

// Log in user
router.post('/login', login, controller.login);

module.exports = router;