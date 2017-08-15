const express = require('express');
const load = require('express-load');

module.exports = function () {
    const app = express();

    // Onde ficam os arquivos estáticos (html, fontes, css)
    app.use(express.static('./public'));

    // Setando o ejs como motor de visualização/Template
    app.set('view engine', 'ejs');

    //require('./routes/produtos')(app);
    // Usando o módulo Express-Load
    load('routes') // carregar os módulos do diretório routes
        .then('infra') // tb carregar os modulos do diretório infra
        .into(app); // var app contém o objeto do express.

    return app; // retorna o template e rotas configuradas;
}