module.exports = function (app) {
    app.get('/promocoes/form', (req, res, next) => {
        const connection = app.infra.connectionFactory();
        
        const produtoDao = new app.infra.ProdutoDao(connection);

        produtoDao.lista((err, results, fields) => {

            res.render('promocoes/form',{ lista:results });

        });

        //connection.end(); // Retira devido ao uso Pool
    });

    app.post('/promocoes', (req, res, next) => {
        const promocao = req.body;

        // disparando o WebSocket, para avisar os navegadores
        // que estão na página principal
        // "io" foi setado em server.js, obtem o acesso a instância do io
        // "novaPromocao" é a tag do evento, será capturado na pagina principal: index.ejs
        app.get('io').emit('novaPromocao', promocao);

        // vamos dispoarar a notificação
        res.redirect('/promocoes/form')
    });
}