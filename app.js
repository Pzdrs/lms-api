const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config({
    path: ".env"
});

const {notFound, handleError} = require('./middleware');

// Routers
const apiRouter = require('./routes/api');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        console.log('Connected to database')
    })
    .catch(err => {
        console.log(err);
    });

app.use(cors({origin: 'https://www.pycrs.rocks', credentials: true}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

// Routes
app.use('/', apiRouter);

app.use(notFound);
app.use(handleError);

app.listen(3000, () => {
    console.log("Listening on port 3000")
})
