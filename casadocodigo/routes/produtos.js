module.exports = function (app) {
    app.get('/produtos', (req, res) => {
        res.render('produtos/lista');
    });
}