# JS35-Node.js
Aplicações Web em JavaScript com Node.JS e Express

# Aula 1

## Conceitos

Transpila
---

* Transforma de uma linguagem para outra. Em JS normalmente se compila de uma versão ES2015+ para outra ex. ES 5.1. 
* O *Babel* é um dos transpiladores disponíveis
* Não é compilar pois não gera código de máquina


## Instalando o Node pelo NVM

* [Site do nvm](https://github.com/creationix/nvm)

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

```bash
nvm install --lts
```

```bash
node -v
```
## Servidor HTTP

*meu-servidor.js*
```js
var http = require('http');

http.createServer(function(req,res){
    console.log('Recebendo request!');
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end('<html><body>Uma msg na tela</body></html>');
}).listen(porta, ip);
```

## JavaScript Snipets

* Evitar o +, usar o crase ` e identificar variáveis por ${}
```js
console.log(`Servidor executando em http://${ip}:${porta}`);
```

## Package.json

Versionamento Semântico:

**^**: qualquer MINOR

**~**: qualquer PATCH

* "^4.15.14"   equivale a   >=4.15.4   <5.0.0
* "~4.15.14" (mais restrito)  >=4.15.4   <4.16.0

## Express

Express é um framework web compatível com as APIs fornecidas pelo Node.js

* Criar a estrutura básica do projeto usando o NPM (*Node Package Manager*)
```bash
npm init
```

* Instalando o Express

```bash
npm install express -save
```

* Código inicial servidor Express

```js
const express = require('express');

const app = express();

const server = app.listen(porta, function () {
    console.log(`Servidor executando em http://${ip}:${porta}`);
});
```

* GET de url e resposta
```js
app.get('/produtos', function (req, res) {
    res.send('Listagem de produtos');
})
```


