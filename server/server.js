import bodyParser from 'body-parser';
import chalk from 'chalk';
import compress from 'compression';
import connectMongo from 'connect-mongo';
import express from 'express';
import expressValidator from 'express-validator';
import favicon from 'serve-favicon';
import flash from 'express-flash';
import logger from 'morgan';
import lusca from 'lusca';
import methodOverride from 'method-override';
import passport from 'passport';
import path from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './config';
import webpackConfig from '../webpack.config';
import routes from './config/routes';

/**
 * Create Mongo Store.
 */

const MongoStore = connectMongo(session);

/**
 * Create Express server.
 */

const app = express();

/**
 * Connect to MongoDB.
 */

mongoose.connect(config.db);
mongoose.connection.on('error', () => console.error('MongoDB Connection Error. Please make sure that MongoDB is running.'));

/**
 * App configuration.
 */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if (app.get('env') === 'development') {
  // compile React components
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));

  // don't minify html
  app.locals.pretty = true;

  // turn on console logging
  app.use(logger('dev'));
}

//app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator({
  customValidators: {
    regexMatch(arg, regex) {
      return arg.match(regex);
    }
  }
}));
app.use(methodOverride());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.sessionSecret,
  store: new MongoStore({ url: config.db, autoReconnect: true })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca({
  csrf: true,
  xframe: 'SAMEORIGIN',
  xssProtection: true
}));

/**
 * Make local variables avaliable in templates.
 */

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// static cache for one week
const week = 604800000;
app.use(express.static(path.join(__dirname, 'public'), { maxAge: week }));

/**
 * Routes setup.
 */

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Error handlers
 */

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
if (app.get('env') === 'production') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}

/**
 * Start Express server.
 */

app.listen(config.port, (err) => {
  if (err) return console.error(err);
  const env = `\n[${chalk.green(app.get('env'))}]`;
  const port = chalk.magenta(config.port);
  console.info(`${env} Listening on port ${port}...\n`);
});

export default app;
