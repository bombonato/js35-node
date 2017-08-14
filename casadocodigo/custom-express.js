const express = require('express');

module.exports = function () {
    const app = express();

    // Setando o ejs como motor de visualização/Template
    app.set('view engine', 'ejs');

    require('./routes/produtos')(app);

    return app; // retorna o template e rotas configuradas;
}