const router = require('express').Router();
const controller = require('../../controllers/authController');
const {login, signup} = require('../../middleware/validation');
const {requireLoggedIn} = require('../../middleware/authentication');

// Logged in check
router.get('', requireLoggedIn, controller.loggedIn);

// Create new access token
router.get('/refresh_token', controller.refresh_token);

router.post('/forgot', controller.forgot_password)

router.patch('/reset', controller.reset_password)

// Create user
router.post('/signup', signup, controller.signup);

// Log in user
router.post('/login', login, controller.login);

// Log out user
router.get('/logout', controller.logout)

// Log out user on all devices
router.get('/logoutAll/:user', controller.logoutAll)

module.exports = router;