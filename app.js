const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const redisClient = require('./routes/redis');

const app = express();

const PORT = process.env.APP_PORT || 8082;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    store: new redisStore({client: redisClient.redis}),
    secret: 'password',
    resave: true,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}))

app.use(function (req, res, next) {
    if (req.path.indexOf('/login') < 0 && !req.session.username) {
        console.log("direct to login ...")
        return res.send('only /login is allowed');
    } else {
        console.log(" user login ok ...")
        next();
    }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/redis', redisClient.router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(PORT, () =>
    console.log(`API running on http://localhost:${PORT}`)
);

module.exports = app;
