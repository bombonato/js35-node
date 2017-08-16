# JS35-Node.js
Aplicações Web em JavaScript com Node.JS e Express


# Links

[Definições(Types) do VSCode](https://microsoft.github.io/TypeSearch/)
* utilizada para o AutoComplete do VSCode
* O pessoal da Microsoft pega bibliotecas JavaScript de FronteEnde, Node, etc e faz interfaces e pegando os .ts destas interfaces
* Ele internamente também usa o [DefinitelyTyped](http://definitelytyped.org/)

[mysqljs - Driver Conexão MySQL para JS](https://github.com/mysqljs/mysql)
* Ver mais sobre o sistema de [Pool](https://github.com/mysqljs/mysql#pool-options), função createPool()

# Aula 1

## Conceitos

Transpila
---

* Transforma de uma linguagem para outra. Em JS normalmente se compila de uma versão ES2015+ para outra ex. ES 5.1. 
* O *Babel* é um dos transpiladores disponíveis
* Não é compilar pois não gera código de máquina

err - Primeiro Parâmetro
---

* Em JavaScript existe uma convenção que o primeiro parâmetro de uma função é um erro (err), moldando para que o usuário faça o tratamento deste. Ex.:
```js
function(err, result, fields) {
            res.send(result);
        });
```

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

* Os módulos no JS são singletons

* para expotar uma função de um módulo para outro (de um arquivo para outro) é necessário usar a expressão **module.export**, exemplo mais abaixo.

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

* Retirando a parte de listening do app.js para um novo arquivo server.js

server.js
```js
const ce = require('./custom-express');
const app = ce();
//ou, chamando diretamente:
const app = require('./custom-express')();

const server = app.listen(porta, function () {
    console.log(`Servidor executando em http://${ip}:${porta}`);
});
```

# Aula 2

## Conceitos

* Normalmente o CSS e Fontes ficam na pasta \public\ do projeto, por convenção. Para que o EJS consiga ler o diretório public, é necessário adicionar no arquivo custom-express.js o seguinte código:

```js
// Onde ficam os arquivos estáticos (html, fontes, css)
    app.use(express.static('./public'));
```
*obs.:* A função static disponível no módulo do express faz uso da lib serve-stati para possibilitar entrega de arquivos estáticos, integrada com o próprio express.

* Um lema: "*Copiou - Colou - Isolou*". Isso pode ser aplicado para isolar a conexão ao BD, podendo ser reutilizada em diversos locais do código.

## BD 

Exibindo produtos na página capturando do BD (MySQL)

* criando BD
```sql
create database casadocodigo;

create table livros ( 
    id int(11) not null auto_increment, 
    titulo varchar(255) default null, 
    descricao text, 
    preco decimal(10,2) default null, 
    primary key(id) 
);

INSERT INTO livros(titulo,descricao,preco)
VALUES('Começando com nodejs', 'Livro introdutorio', 39.90);

INSERT INTO livros(titulo,descricao,preco)
VALUES('Começando com javascript', 'Livro introdutorio JS', 39.90);

INSERT INTO livros(titulo,descricao,preco)
VALUES('Começando com express', 'Livro introdutorio Express', 39.90);
```

* Instalando o mysql para o node

```bash
npm install mysql --save
```

* Código da conexão e consulta

routes\produtos.js
```js
app.get('/produtos', (req, res, next) => {

        const mysql = require('mysql');

        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            datatase: 'casadocodigo'
        });

        /*
            O query() é assincrono, precisa criar um função de CallBack
            - fields - array com metainformações sobre os dados/campos
        */
        connection.query('SELECT * FROM livros', function(err, results, fields) {
            //res.send(result);

            if(err) {
                console.error(err.stack);
                next(err);
                return;
            }
            res.render('produtos/lista',{lista:results});
        });

        connection.end();
    });
```
*obs1.*: veja que **lista** recebe o resultado, que será utilizado no HTML.

*obs2.*: cuidado com os nomes dos parâmetros de DB, caso escritos erronamente dará erros difíceis de encontrar, ex. escreber "datase" em vez de database. Detalhe que ele está fora do query(), mesmo assim ele espera a finalização para então encerrar. Se quiser encerrar de imediato, precisaria usar **connection.destroy()**.

*obs3.*: o *connection.end()* faz com que a conexão feche, pode ser verificada no MySQL console com o comando **show processlist;**

* código do template que irá exibir as informações
views\produtos\lista.ejs
```html
 <tbody>
    <% for(var i=0; i<lista.length; i++) { %>
    <tr>
        <td><%= lista[i].titulo %></td>
        <td><%= lista[i].preco %></td>
        <td><p><%= lista[i].descricao %></p></td>
    </tr>
    <% } %>
</tbody>
```

### Isolando Conexão BD

infra\connectionFactory.js

```js
const mysql = require('mysql');

function createConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        datatase: 'casadocodigo'
    });
}

module.exports = createConnection;
```
**importante**: perceba que *module.exports* é singleton, não seria possível no caso retornar uma variável da conexão, pois se assim fosse, ele iria criar uma única conexão para todo o sistema, logo ao usá-la em querys() e depois dar um .end() ela fecharia a conexão para sempre. Logo, o melhor é retornar como função, pois no caso reornará como referência (parecido com o & do C++) a função e ainda não será chamada. Só no momento que precisar ele executa e finaliza quando necessário. Externamente ao receber/usar é como função "()" ao chamar o connectionFactory, exemplo:
```js
const connectionFactory = require('../infra/connectionFactory');

 const connection = connectionFactory();
```

* Continuando, para usar a conexão, usa-se:

```js
const connectionFactory = require('../infra/connectionFactory');

module.exports = function (app) {
    app.get('/produtos', (req, res, next) => {

        const connection = connectionFactory();

        connection.query('SELECT * FROM livros', function(err, results, fields) {
        ...
```

### Sistema de Pool

* Para usar o sistema de Pool, basta usar o método createPool() que adiciona algumas [opções](https://github.com/mysqljs/mysql#pool-options) a mais
```js
function createPool() {
    //return mysql.createConnectionPool({
    return mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'casadocodigo',
        connectionLimit: 10, // padrao sem colocar é 10
        queueLimit: 0,
        acquireTimeout: 10000
    });
}

module.exports = createPool;
```

* Deve retirar o end() ao utilizar o Pool
```js
//connection.end();
```

## Classes - Heranças, etc

* no JavaScript, temos um modelo de classes, chamada de *Função Construtora* :

```js
function Produto(paramNome, paramPreco){
    this.nome = paramNome;
    this.preco = paramPreco;
}
```

* Para adicionarmos um método não existente em uma classe, pode-se utilizar o **prototype** para criar uma função que irá funcionar como herança
```js
Produto.prototype.calculaDesconto = function() {
    return this.preco * 0.1;
}
```

* uso da função construtora, instanciação com new

```js
var produto1 = new Produto('camisa', 35);
```

* Já no ES2015+ tem suporte a **class**, podendo então reescrever o código como:

```js
class Produto {
    constructor(paramNome, paramPreco){
        this.nome = paramNome;
        this.preco = paramPreco;
    }

    calculaDesconto(){
        return this.preco * 0.1;
    }
}

var produto1 = new Produto('camisa', 35);
```

* Aplicando isso ao projeto, vamos criar um DAO chamado ProdutoDao, deixando os SQL separados e acessíveis ao projeto.

**modelo usando Função Construtora**:
```js
function ProdutoDao(connection) {
    this.connection = connection;
};

ProdutoDao.prototype.lista = function(callback){
    this.connection.query('SELECT * FROM livros', callback);
};

module.exports = ProdutoDao;
```

**modelo usando Classes do ES2015+**:
```js
class ProdutoDao {

    constructor(connection){
        this.connection = connection;
    }

    lista(callback) {
        this.connection.query('SELECT * FROM livros', callback);
    }
}

module.exports = ProdutoDao;
```

## Carregador de Módulos automático

* O Express tem um módulo para carregamento automático, chamado **Express-Load**

```bash
npm install express-load --save
```
*obs.*: não usa o "-g", pois é da sua aplicação, não de linha de comando

A criação de módulos muda 

DE
```js
require('./routes/produtos')(app);
```
PARA
```js
    // Usando o módulo Express-Load
    load('routes') // carregar os módulos do diretório routes
        .then('infra') // tb carregar os modulos do diretório infra
        .into(app); // var app contém o objeto do express.
```

Como não utiliza mais o require, o produtos.js muda para o código abaixo, sendo que o **app** tem acesso ao módulo importando *infra*, podendo fazer o acesso da seguinte forma:
```js
const connection = app.infra.connectionFactory();
        
const produtoDao = new app.infra.ProdutoDao(connection);
```

Para completar, é precisa mudar tanto o ProdutoDao quanto o connectionFactory para ao exportar fazer como função, caso contrário irã instanciar somente uma única vez. Esse recurso chama-se *função wrapper*:

```js
module.exports = function () {
    return ProdutoDao
}
```


# Aula 3

## Conceitos

* Arquivos na pasta **views** não são acessíveis diretamente por nenhum cliente. Não é possível fazer: http://localhost:3000/views/produtos/form.ejs

* Todas as informações que são enviadas em uma requisição estão disponíveis na variãvel *req*. Já a propriedade *body* da req retorna os dados preenchidos no formulário de cadastro. Contudo no **express** ao acessar o *req.body* recebemos *undefined*, pois antes de usá-lo é necessário instalar o módulo **body-parser** que altera a estrutura do objeto que representa o request, justamente adicionando essa propriedade. Com o body-parser o Express consegue transformar em objeto javascript para ser tratado.

* o node por padrão usa só 1 thread. Ao subir o executável do servidor node ele sobe só 1 thread. Existem bibliotecas para gerenciamento de processos, tais como PM2, StrongLoopPM, etc. Em situações que usam muita cpu (I/O Bound, CPU Bound, Gzip) o node sozinho não é bom. Normalmente para escalonar se usa um servidor na frente (ex. NGINX) que distribui para vários servidores Node, inclusive podendo deixar o servidor web nginx servir as partes estáticas (html, css, etc).

* Nome de variáveis em javascript não pode ter "-", pode ter $, A-za-z e 0-9.

## Formulário

Instalar o **body-parser** para ler o *req.body* com os dados do formulário.

```bash
npm install body-parser --save
```

Também é preciso ensinar ao *express* a usar o **body-parser** para recuperar os parâmetros enviados na requisição e deixar disponível na propriedade **body**.

\custom-express.js
```js
const bodyParser = require('body-parser');

module.exports = function () {
    const app = express();

    // ensinando o Express a recuperar os parâmetros da requisição req
    // e deixar disponível na propriedade body
    app.use(bodyParser.urlencoded());
``` 
Para obter o formulário é feito um GET no formulário, já para mandar os dados para inserir é feito um POST em produtos:

obter o Formulário para ser preenchido
* GET  localhost:3000/produtos/form (recuperar formulário)

enviar os dados do fomulário para gravação
* POST localhost:3000/produtos (salvar dados)
* além de enviar os parâmetros: titulo, preco e descricao

Criando a Rota

```js
// Obter o Formulário (GET)
    app.get('/produtos/form', (req,res) => {
        // busca o template eps do formulário em view
        res.render('produtos/form'); 
    });

    // Salvar os Dados do formulário (POST)
    app.post('/produtos', (req,res) => {
        const produto = req.body; // acessível devido a lib body-parser

        const connection = app.infra.connectionFactory();
        
        const produtoDao = new app.infra.ProdutoDao(connection);

        produtoDao.salva(produto, (err, results) => {

            if(err) {
                console.error(err.stack);
                next(err);
                return;
            }

            res.render('produtos/salvo');
        });

    });
```

E criando o Salvar no DAO

```js
 salva(produto, callback) {
        this.connection.query('INSERT INTO livros SET ?', produto, callback)
    }
```