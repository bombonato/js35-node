const ip = 'localhost';
const porta = 3000;

const app = require('./custom-express')();

app.listen(porta, () => {
    console.log(`Servidor executando em http://${ip}:${porta}`);
});