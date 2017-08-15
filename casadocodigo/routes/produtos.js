const connectionFactory = require('../infra/connectionFactory');
const ProdutoDao = require('../infra/ProdutoDao');

module.exports = function (app) {
    app.get('/produtos', (req, res, next) => {
        //res.render('produtos/lista');

        
        //const connection = connectionFactory();
        const connection = connectionFactory();
        
        const produtoDao = new ProdutoDao(connection);

        produtoDao.lista((err, results, fields) => {

            if(err) {
                console.error(err.stack);
                next(err);
                return;
            }

            res.render('produtos/lista',{lista:results});
        });

        //connection.end(); // Retira devido ao uso Pool
    });
}