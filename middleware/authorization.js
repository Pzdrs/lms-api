module.exports = (req, res, next) => {
    if (!req.user.isAdmin) return res.status(403).send('You do not have access to this resource');
    next();
};