module.exports = function (app) {
  app.get('/estoque', function (req, res) {
    res.render('estoque/index');
  });
}