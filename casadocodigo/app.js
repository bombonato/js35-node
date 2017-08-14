const express = require('express');

const ip = 'localhost';
const porta = 3000;

const app = express();

console.log(express.name);

app.get('/produtos', function (req, res) {
    res.send('Listagem de produtos');
})

const server = app.listen(porta, function () {
    console.log(`Servidor executando em http://${ip}:${porta}`);
});