export default {
  getIndex(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.render('main/index', { title: 'Redux Poll' });
    }

    res.render('main/dashboard', { title: 'Redux Poll' });
  }
};
