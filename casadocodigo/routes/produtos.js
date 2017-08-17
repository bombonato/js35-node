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

            res.format({
                html: () => {
                    res.render('produtos/lista',{lista:results});
                },
                json: () => {
                    res.json(results);
                },
                default:  () => {
                    res.status(406).send('No acceptable');
                    return;
                },
            });

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

        // Validação
        req.assert('titulo', 'Título deve ser preenchido').notEmpty();
        req.assert('preco', 'Preço deve ser um número').isFloat();
        const errosValidacao = req.validationErrors();
        //const errosValidacao = req.getValidationResult();
        
        // Redirecionar em caso de erros na validação
        if(errosValidacao) {
            console.log('há erros de validação!');
            res.format({
                html: () => {
                    res.status(400).render('produtos/form',
                    { validationErrors: errosValidacao });
                },
                json: () => {
                    res.status(400).send(errosValidacao);
                },
                default:  () => {
                    res.status(400).send(errosValidacao);
                },
            });
            return;
        }

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