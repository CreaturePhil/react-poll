import Poll from '../models/Poll';

export default {
  getIndex(req, res) {
    if (!req.isAuthenticated()) {
      return res.render('main/index', { title: 'Redux Poll' });
    }

    res.render('main/dashboard', { title: 'Redux Poll' });
  },

  postIndex(req, res, next) {
    const options = Object.keys(req.body)
      .filter(name => name.indexOf('option') >= 0)
      .map((name, oid) => ({name, oid, votes: 0, voters: []}));

    const poll = new Poll({
      question: req.body.question,
      author: req.user.uid,
      options
    });

    poll.save(err => {
      if (err) return next(err);
      req.flash('success', { msg: 'New Poll Created!' });
      res.redirect('/');
    });
  }
};
