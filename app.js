const Boom = require('boom');
const express = require('express');

const logger = require('morgan');
const usersRouter = require('./routes/contact');
const users = require('./routes/users');
const addressRouter = require('./routes/adress');
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use('/api/v1/users', users);
app.use('/api/v1/conatctes', usersRouter);
app.use('/api/v1/adresses', addressRouter);

// error handler
app.use((req, res, next) => {
    const err = Boom.notFound(`Connat find ${req.path}`);

    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.output.statusCode).json(err.output.payload);
});

module.exports = app;
