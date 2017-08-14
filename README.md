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

### Monitoramente de alterações do servidor

* **NodeMon** - Monitor de "hotdeploy" para o node verificar as alterações
```bash
npm install -g nodemon
```

* Para as alterações serem em "tempo-real", usar o comando:
```bash
nodemon app.js (pode omitir o .js)
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
### EJS

EJS (Emedded JavaScript) - permite escrever página dinâmicas e já possi integração com Express, é uma biblioteca de templates. Outras disponíveis com suporte a Express: Swig, Pug, Hogan

* Instalar o EJS
```bash
npm install ejs --save
```
*obs.*: nesse caso usa o --save, visto que é uma biblioteca que irá ser utilizada no desenvolvimento, fará parte do produto, precisaremos dela no desenvolvimento

* Código
```js
// Setando o ejs como motor de visualização
app.set('view engine', 'ejs');

app.get('/produtos', function (req, res) {
    //res.send('<h1>Listagem de produtos</h1>');
    // por padrão a rota sera o recurso + arquivo sem a extenção .ejs. Procura em: views\produtos\lista.ejs
    // Acaba sendo um sistema de rotas
    res.render('produtos/lista'); 
});
```

* O *Controller* será o Express.

* HTML

Criar o HTML dentro da pasta "views\produtos\" e com extenção ".ejs" (pois é um template).

views\produtos\lista.ejs

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Listagem</title>
</head>
<body>
    <h1>Lisa de Produtos</h1>
</body>
</html>
```

### Outros frameworks

* Existem frameworks criados como uma camada para o Express, extendendo e incluindo funcionalidades. Como o Sails e Kraken, que usam o Express e extendend com funcionalidades parecidas com o Rails.

### Modulando Rotas

* para expotar uma função de um módulo para outro (de um arquivo para outro) é necessário usar a expressão **module.export**, exemplo:

routes/produtos.js
```js
module.exports = function (app) {
    app.get('/produtos', (req, res) => {
        res.render('produtos/lista');
    });
}
```

* e usa no principal (app.js) da seguinte forma:

```js
require('./routes/produtos')(app);
//ou, usando outra forma equivalete : 
var produtos = require('./routes/produtos');
produtos(app);
```


