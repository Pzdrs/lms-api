const nodemailer = require('nodemailer');

exports.sendPassResetEmail = (to, token) => {
    const path = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://lms-maturita.herokuapp.com';
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
            html: `Click here to reset your password: <a href="${path}/forgot-password?t=${token}">localhost:8080/forgot-password?t=${token}</a>. You have 15 minutes to do so.`
        });
};