const express = require('express');

// Retorna o objeto que representa todo o contexto 
//do express (o nome é createApplication)
console.log(express.name);

const ip = 'localhost';
const porta = 3000;

const app = express();

// Setando o ejs como motor de visualização
app.set('view engine', 'ejs');

app.get('/produtos', (req, res) => {
    //res.send('<h1>Listagem de produtos</h1>'); // tirando o HTML do código para ser renderizado pelo EJS
    res.render('produtos/lista');
});

const server = app.listen(porta, function () {
    console.log(`Servidor executando em http://${ip}:${porta}`);
});