import passport from 'passport';

import User from '../models/User';
import config from '../config';

module.exports = {
  getLogin(req, res) {
    if (req.user) return res.redirect('/');
    res.render('user/login', { title: 'Log In' });
  },

  postLogin(req, res, next) {
    req.assert('username', 'Only letters and numbers are allow in username.').regexMatch(/^[A-Za-z0-9]*$/);
    req.assert('username', 'Username cannot be more than 30 characters.').len(1, 30);
    req.assert('password', 'Password cannot be blank.').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      req.flash('errors', errors);
      return res.redirect('/login');
    }

    if (req.body.remember) {
      // 30 days
      req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30;
    } else {
      req.session.cookie.expires = false;
    }

    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        req.flash('errors', { msg: info.message });
        return res.redirect('/login');
      }

      req.logIn(user, (err) => {
        if (err) return next(err);
        req.flash('success', { msg: 'Success! You are logged in.' });
        res.redirect('/');
      });
    })(req, res, next);
  },

  getLogout(req, res) {
    req.logout();
    req.flash('success', { msg: 'Success! You are logged out.' });
    res.redirect('/login');
  },

  getSignup(req, res) {
    if (req.user) return res.redirect('/');
    res.render('user/signup', { title: 'Sign Up' });
  },

  postSignup(req, res, next) {
    req.assert('username', 'Only letters and numbers are allow in username.').regexMatch(/^[A-Za-z0-9]*$/);
    req.assert('username', 'Username cannot be more than 30 characters.').len(1, 30);
    req.assert('password', 'Password must be at least 4 characters long.').len(4);

    const errors = req.validationErrors();

    if (errors) {
      req.flash('errors', errors);
      return res.redirect('/signup');
    }

    var user = new User({
      uid: req.body.username.toLowerCase(),
      username: req.body.username,
      password: req.body.password
    });

    User.findOne({ uid: req.body.username.toLowerCase() }, (err, existingUser) => {
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that username already exists.' });
        return res.redirect('/signup');
      }

      user.save((err) => {
        if (err) return next(err);
        req.logIn(user, (err) => {
          if (err) return next(err);
          req.flash('success', { msg: 'Success! You account has been created.' });
          res.redirect('/');
        });
      });
    });
  }
};
