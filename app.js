const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const session = require('express-session');
const bodyParser = require('body-parser');
const FileStore = require('session-file-store')(session);


var indexRouter = require('./routes/index');
var alunoRouter = require('./routes/aluno');
var profRouter = require('./routes/professor');
var coordRouter = require('./routes/coordenador');

const connection = require('./infra/connection');
const DatabaseMethods = require('./infra/DatabaseMethods');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


const options = {
	ttl: 60,
	minTimeout: 50, // deve ser menor q o maxTimeout
	maxTimeout: 500,
	reapInterval: 180,
	reapAsync: true,
	reapSyncFallback: true
};

const sessionStore = new FileStore(options);

app.use(session({
	store: sessionStore,
	name : 'userid',
	secret : 'secreto',
	saveUninitialized : false,
	resave : false,
	cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      sameSite: true,
      secure: process.env.NODE_ENV === 'production'
	}
}));

app.use('/', indexRouter);
app.use('/dashboard_aluno', alunoRouter);
app.use('/dashboard_professor', profRouter);
app.use('/dashboard_coordenador', coordRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
