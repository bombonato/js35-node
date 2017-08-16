// const connectionFactory = require('../infra/connectionFactory');
// const ProdutoDao = require('../infra/ProdutoDao');

module.exports = function (app) {
    app.get('/produtos', (req, res, next) => {
        //res.render('produtos/lista');

        
        //const connection = connectionFactory();
        const connection = app.infra.connectionFactory();
        
        const produtoDao = new app.infra.ProdutoDao(connection);

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

    // Obter o Formulário (GET)
    app.get('/produtos/form', (req,res) => {
        // busca o template eps do formulário em view
        res.render('produtos/form'); 
    });

    // Salvar os Dados do formulário (POST)
    app.post('/produtos', (req,res) => {
        const produto = req.body; // acessível devido a lib body-parser

        const connection = app.infra.connectionFactory();
        
        const produtoDao = new app.infra.ProdutoDao(connection);

        produtoDao.salva(produto, (err, results) => {

            if(err) {
                console.error(err.stack);
                next(err);
                return;
            }

            //res.render('produtos/salvo');
            res.redirect('/produtos');
        });

    });
}