const express = require('express');

// Retorna o objeto que representa todo o contexto 
//do express (o nome é createApplication)
console.log(express.name);

const ip = 'localhost';
const porta = 3000;

const app = express();

// Setando o ejs como motor de visualização
app.set('view engine', 'ejs');

require('./routes/produtos')(app); // não precisa colocar o .js no final, é subentendido pelo node

const server = app.listen(porta, function () {
    console.log(`Servidor executando em http://${ip}:${porta}`);
});