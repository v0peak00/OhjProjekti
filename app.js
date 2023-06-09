var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

var bookRouter = require('./routes/book');
var userRouter = require('./routes/user');
var loginRouter = require('./routes/login')
var carRouter = require('./routes/car');

var app = express();

app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/book', bookRouter);
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/car', carRouter);

module.exports = app;
