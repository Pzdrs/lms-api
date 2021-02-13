const History = require('../models/History');
exports.booksInUse = async () => {
    return History.countDocuments({'date.to': {$gt: Date.now()}});
};