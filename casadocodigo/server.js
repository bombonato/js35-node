const app = require('./custom-express')();

const http = require('http').Server(app); //para poder criar o websockert
const io = require('socket.io')(http); //para usar o websocket
app.set('io', io); // seta chave-valor, permite pegar o io na rota promocoes

const ip = 'localhost';
const porta = 3000;

//app.listen(porta, () => {
http.listen(porta, () => {
    console.log(`Servidor executando em http://${ip}:${porta}`);
});