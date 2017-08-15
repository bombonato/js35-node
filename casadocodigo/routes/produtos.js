const connectionFactory = require('../infra/connectionFactory');

module.exports = function (app) {
    app.get('/produtos', (req, res, next) => {
        //res.render('produtos/lista');

        
        //const connection = connectionFactory();
        const connection = connectionFactory();
        /*
            O query() é assincrono, precisa criar um função de CallBack
            - fields - array com metainformações sobre os dados/campos
        */
        connection.query('SELECT * FROM livros', function(err, results, fields) {
            //res.send(result);

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