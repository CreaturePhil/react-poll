export default {
  getIndex(req, res, next) {
    res.render('main/index', { title: 'Redux Poll' });
  }
};
