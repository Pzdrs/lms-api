const History = require('../models/History');
exports.booksInUse = async () => {
    return History.countDocuments({'returned': false});
};