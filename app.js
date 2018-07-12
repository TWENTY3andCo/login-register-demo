const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const mongourl = require('./configs/db');
const index = require('./routes/index');
const users = require('./routes/users');
const login = require('./routes/login');
const logout = require('./routes/logout');
const register = require('./routes/register');
const profile = require('./routes/profile');
const admin = require('./routes/admin');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);    
const app = express();

mongoose.connect(mongourl).then(() => {
    console.log('Connected to database');
}).catch(e => {
    console.log('Failed to connect to database', e);
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootswatch/')));


//Initialize session
app.use(session({
    secret: 'just a secret word',
    resave: 'false',
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        autoRemove: 'interval',
        autoRemoveInterval: 60 //60 minutes
    })
}));

app.use(passport.initialize());
app.use(passport.session());

//Express messages
app.use(flash());
/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
app.use((req, res, next) => {
    
    //Store flash messages for each request
    let success = req.flash('success');
    let error = req.flash('error');
    let error_msg = req.flash('error_msg');
    res.locals.messages = require('express-messages')(req, res);
    res.locals.success = success[0];
    res.locals.error = error[0];
    res.locals.error_msg = error_msg[0]
    res.locals.user = req.user || null;
    next();
});

//Express validator
app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        let namespace = param.split('.');
        let root = namespace.shift();
        let formParam = root;
        while (namespace.length) {
            formParam += `[${namespace.shift()}]`;
        }
        return {
            param: formParam,
            msg,
            value
        }
    }
}));


app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/register',register);  
app.use('/profile',profile);
app.use('/logout',logout);
app.use('/admin',admin);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
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

module.exports = app;
