const http = require('http');

const ip = 'localhost';
const porta = 3000;

http.createServer(function (req, res) {
    console.log('Recebendo request!');
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    res.end('<html><body>Uma msg na tela</body></html>');
}).listen(porta, ip);

console.log(`Servidor executando em http://${ip}:${porta}`);