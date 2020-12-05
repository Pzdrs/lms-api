exports.notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

exports.handleError = (error, req, res, next) => {
    res.status(res.statusCode || 500);
    res.json({
        success: false,
        message: error.message
    });
};