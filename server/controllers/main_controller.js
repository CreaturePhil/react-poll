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
      .map((name, index) => ({name: req.body[name], oid: index, votes: 0, voters: []}));

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
  },

  getPolls(req, res, next) {
    Poll.find({author: req.user.uid}, (err, polls) => {
      if (err) return next(err);
      res.json(polls);
    });
  },

  postPolls(req, res, next) {
    console.log(req.ip);
    console.log(req.body._id);
    console.log(req.body);
    res.redirect('/');
  }
};
