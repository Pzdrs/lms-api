const nodemailer = require('nodemailer');

exports.sendPassResetEmail = (to, token) => {
    nodemailer
        .createTransport({
            pool: true,
            host: 'smtp.seznam.cz',
            port: 465,
            secure: true,
            auth: {
                user: 'admin.lms@post.cz',
                pass: 'Heslo22yc/'
            }
        })
        .sendMail({
            from: 'admin.lms@post.cz',
            to,
            subject: 'Forgotten password',
            html: `Click here to reset your password: <a href="http://localhost:8080/forgot-password?t=${token}">localhost:8080/forgot-password?t=${token}</a>. You have 15 minutes to do so.`
        });
};