module.exports = function (app) {
    app.get('/produtos', (req, res) => {
        //res.render('produtos/lista');

        const mysql = require('mysql');

        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            dataase: 'casadocodigo'
        });

        /*
            O query() é assincrono, precisa criar um função de CallBack
            - fields - array com metainformações sobre os dados/campos
        */
        connection.query('SELECT * FROM livros', function(err, result, fields) {
            res.send(result);
        });
    });
}