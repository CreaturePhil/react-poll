import passport from 'passport';
import { Strategy } from 'passport-local';
import User from '../models/User';
import config from './index';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign in using Username and Password.
 */

passport.use(new Strategy({ usernameField: 'username' }, (username, password, done) => {
  User.findOne({ uid: username.toLowerCase() }, (err, user) => {
    if (!user) return done(null, false, { message: `User ${username} not found.` });
    user.comparePassword(password, function(err, isMatch) {
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid username or password.' });
      }
    });
  });
}));

/**
 * Login Required middleware.
 */

export function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
};
