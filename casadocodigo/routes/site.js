module.exports = function (app) {
    app.get('/', (req, res, next) => {
        const connection = app.infra.connectionFactory();
        
        const produtoDao = new app.infra.ProdutoDao(connection);

        produtoDao.lista((err, results, fields) => {

            res.render('home/index',{ livros:results });

        });

        //connection.end(); // Retira devido ao uso Pool
    });
}