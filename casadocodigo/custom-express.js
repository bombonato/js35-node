const express = require('express');
const load = require('express-load');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

module.exports = function () {
    const app = express();

    // Onde ficam os arquivos estáticos (html, fontes, css)
    app.use(express.static('./public'));

    // ensinando o Express a recuperar os parâmetros da requisição req
    // e deixar disponível na propriedade body
    //app.use(bodyParser.urlencoded());

    // Adicionando suporte a JSON no body
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // Suporte a Validação dos status http
    app.use(expressValidator());

    // Setando o ejs como motor de visualização/Template
    app.set('view engine', 'ejs');

    //require('./routes/produtos')(app);
    // Usando o módulo Express-Load
    load('routes') // carregar os módulos do diretório routes
        .then('infra') // tb carregar os modulos do diretório infra
        .into(app); // var app contém o objeto do express.

    return app; // retorna o template e rotas configuradas;
}