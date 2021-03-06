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

* Todas as operações dentro do Node são feitas de maneira assíncrona, as bibliotecas contruídas em cima da plataforma funcionam em cima do modelo assíncrono imposto por ele. As operações são feitas de maneira não blocando e quando estiver pronta/finalizada o *callback* é chamado. Dessa maneira, a mesma Thread rodando no Noje.js consegue atender um número maior de requisições, deixando a aplicação mais fãcil de escalar em cenários de muitos requests. A diferença é tão absurda que, por padrão, o Node.js funciona apenas com *uma* thread.

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

### Redirect

A função *redirect* indica par ao express que em vez de simplesmente fazer um forward, é necessário que ele retorne o status 302 para o navegador, solicitando que o mesmo faça um novo request para o novo endereço.
 Essa técinica, fazer um redirect do lado do cliente logo após um post, ẽ um padrão conhecido da web chamado de **Always Redirect After Post**. Deve ser sempre utilizando quando o cliente é uma pessoa usando um navegador

\routes\produtos.js
 ```js
app.post('/produtos', (req,res) => {
        ...
        produtoDao.salva(produto, (err, results) => {
            res.redirect('/produtos');
        });
    });
 ```

## Formato de Resposta

Trata sobre permitir que seja respondido no formato desejado pelo usuário/cliente (ex. HTML, JSON, etc).

### Content Negotiation

* também chamado de *Content Type Negotiation*

Esta técnica é feita através do cabeçalho *Accept* , indicando o formato que queremos, muito utilizada em integrações baseadas no HTTP (como REST).

```bash
curl -H "Accept: application/json" http://localhost:3000/produtos

curl -H "Accept: text/html" http://localhost:3000/
```

No *express* o suporte é feito pela função **format()** que baseado no cabeçalho *Accept* da requisição ele decide o que usar

* o **res.render()** por padrão já manda no formato *text/html*. Será trocado o render() por format() especificando os formatos desejados.

routes\produtos.js
```js
app.get('/produtos', (req, res, next) => {
        ...
        produtoDao.lista((err, results, fields) => {

            res.format({
                html: () => {
                    res.render('produtos/lista',{lista:results});
                },
                json: () => {
                    res.json(results);
                }
            });

        });
```

Para a parte de Formulário, também é possível interferir no formato de envio. Quando prrenchido numa página web o formulário e enviado no formato *x-www-form-urlencoded*.

\custom-express.js
```js
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
```

Mandando o envio de dados pelo formulário por curl, configurando o content-type para *application/json* no método *POST*:

```bash
curl -H "Content-type: application/json" \
-X POST \
-d '{"titulo":"Curl","preco":102,"descricao":"Detalhes sobre uso do Curl"}' \
http://localhost:3000/produtos
```

## Validação Status HTTP

Para realizar validações, pode-se utilizar do módulo **express-validator**

```bash
npm install express-validator --save
```

Instalado o módulo é preciso carregá-lo no express

\custom-express.js
```js
const expressValidator = require('express-validator');

// Suporte a Validação dos status http
app.use(expressValidator());
```

Carregado o suporte a validação, segue o código para realizar a validação em si:

\routes\produtos.js
```js
...
app.post('/produtos', (req,res) => {
        
        // Validação
        req.assert('titulo', 'Título deve ser preenchido').notEmpty();
        req.assert('preco', 'Preço deve ser um número').isFloat();
        const errosValidacao = req.validationErrors();
        
        // Redirecionar em caso de erros na validação
        if(errosValidacao) {
            console.log('há erros de validação!');
            res.format({
                html: () => {
                    res.status(400).render('produtos/form',
                    { validationErrors: errosValidacao });
                },
                json: () => {
                    res.status(400).send(errosValidacao);
                },
                default:  () => {
                    res.status(400).send(errosValidacao);
                },
            });
            return;
        }

        produtoDao.salva(produto, (err, results) => {
        ...
```

* Ao utilizar o *express-validator* é adicionado ao request algumas novas funções. Tais como o *assert()* e *erros()*. A primeira retorna um objeto cujo tipo é **ValidatorChain**, internamente ele usa o módulo chamado *validator*. Já o segundo adiciona no request para possibilitar a recuperação dos erros gerados.


E na página do Form adicionamos um local para exibir erros de validação

\views\produtos\form.ejs
```html
...
        <% if(locals.validationErrors) { %>
            <ul class="list-unstyled">
                <% for(var i=0; i < validationErrors.length; i++) { %>
                    <li class="alert alert-danger">
                        <%= validationErrors[i].msg %>
                    </li>
                <% } %>
            </ul>
        <% } %>

        <form action="/produtos" method="post" class="well" role="form">
...

```
*obs.*: se utilizar a variável *validationErros*, obtida a partir do parâmetro format() html da rota produtos.js, será apresentado um erro, pois o Form ao inserir um novo livro o Form está limpo/vazio, logo não passou pela validação e esta variável encontra-se *undefined*. Mas ao acessar através de **locals** é realizado o tratamento adequado evitando erros no momento que ainda está *undefinied*.

# Aula 4

## Conceitos

* Para exportar um objeto no Node basta usar o "{ }", ex.:
```js
module.exports = {
    limpa: efetuaLimpeza
}
```

* *assert* já vem no Node.js. Não é uma palavra reservada do JavaScript, é retornada como objeto (não precisa usá-la como função)

* Testes envolvendo várias camadas da nossa aplicação (bd, express, validadores), são testes que usam várias partes do projeto, é conhecido como **Teste de Integração**. Usado para verificar se todas as partes do sistema estão funcionando em conjunto.

* Testes envolvendo lógica mais complicada, isolada em uma função, apenas de um trecho, são conhecidos como **Teste de Unidade**, envolvem mais regras de negócio.

* Testes com uma especificação é conhecido como BDD. Algo como *describe(...)... it('should ...')*, exemplo:

```js
const http = require('http');
const assert = require('assert');
describe('Product route', () => {
    // it - descrição de um cenário
    it('should list products', (done) => {
// ARRANGE
        const configuracoes = {
            hostname: 'localhost',
            port: 3000,
            path: '/produtos',
            headers: { Accept: 'application/json'}
        }
// ACT
        http.get(configuracoes, (res) => {
// ASSERT
            // faz as verificações que quer
            assert.equal(res.statusCode, 200);
            assert.equal(res.headers['Content-type'], 'application/json; charset=utf-8');
            done();
        });
    });
});
```
obs.: Maneira crua de fazer o teste, usando o cliente e não com recursos do servidor (node/express), visto em seguida.

## Testes

* Mocha e Supertest

* O **Supertest** facilita com a configuração necessária do http, já passando a aplicação realizada do Express, não precisando reconfigurar tudo novamente. Além de pertitir usar o módulo ao invés de usar diretamente a API sobre o HTTP fornecida pelo Node.js. Outras vantagens
    * Não precisar criar o JSON de configuração para fazer a requisição
    * As asserções baseadas no response já estão encapsuladas em funções
    * Diminuimos o número de funções anônimas necessárias.
    * Integração com o Mocha já aeitando como argumento a função de finalizações passada pelo Mocha (função *done*)

```bash
npm install mocha --save-dev -g

npm install supertest --save-dev
```
*obs.*: usa o "save-dev" pois será só usando em desenvolvimento, não em produção.

```bash
$ mocha // roda o mocha

$ mocha --recursive // procura na pasta test para dentro recursivamente
ou
$ mocha -p test/routes // executar os testes de routes

$ mocha --watch // para ficar vendo alterações e rodar
```

\test\routes\produtos.js
```js
const app = require('../../custom-express')();
const supertest = require('supertest');
const request = supertest(app);

describe('product route', function() {
    it('should list products', function (done) {
        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-Type',/json/) //regex
            .expect(200, done);
    });

    it('should list products in html', function(done) {
        request.get('/produtos')
            .expect('Content-Type',/html/) //regex
            .expect(200, done);
    });

    it('deve ter livro cadastrado válido', (done) => {
        request.post('/produtos')
            .send({
                titulo:'Cangaceiro JS',
                preco: 29
                })
            .expect('Location','/produtos')
            .expect(302, done);
    });

    it('deve ter livro cadastrado inválido', (done) => {
        request.post('/produtos')
            .send({
                preco: 29 // pelo validador, vai faltar o Titulo
                })
            .expect(400, done);
    });
});
```

Chamar o Mocha recursivamente e sempre ativo:
```bash
$ mocha --recursive --watch
```
Resultado
```text
product route
    ✓ should list products (39ms)
    ✓ should list products in html
    ✓ deve ter livro cadastrado válido (68ms)
há erros de validação!
    ✓ deve ter livro cadastrado inválido

  4 passing (146ms)
```

### Criando BD de testes

É interessante que o banco de dados de test seja difernete do banco usado (dsv, prd, etc), pois será inserido dados, apagado e outras operações que podem sujar a base. Para tal, uma abordagem é reconfigurar outro BD e passar uma variável de ambiente ao rodar os testes.

Criando BD de Testes:
```bash
mysqladmin -u root -p create casadocodigo_teste

mysqldump -u root -p casadocodigo > cdc.sql

mysql -u root -p casadocodigo_teste < cdc.sql
```

No código de configuração da conexão com o BD é preciso diferenciar entre ambientes para que seja carregado o banco de dados correto

\infra\connectionFactory.js
```js
function createPool() {

    let databaseName = 'casadocodigo';

    if(process.env.NODE_ENV == 'test') {
        databaseName = 'casadocodigo_teste';
    }

    return mysql.createPool({
        database: databaseName,

```
*obs.*: usar o **process.env** dá acesso ao processo do Node e as variáveis de ambiente (env) carregadas.

Ao chamar os testes, executar passando a variável de ambiente **NODE_ENV=test**.

```bash
 NODE_ENV=test mocha --recursive --watch
```

### Limpando BD

Para testes é interessante limpar o banco ande de executá-los, para não influenciar nos testes.

```bash
npm install database-cleaner --save-dev
```

No código, configurar o driver do bd utilizado e passar o clean() em cima da conexão realizada

```js
const app = require('../../custom-express')();
const supertest = require('supertest');
const request = supertest(app);
const DatabaseCleaner = require('database-cleaner');

describe('product route', () => {

    beforeEach( (done) => { 
        var dbCleaner = new DatabaseCleaner('mysql');
        dbCleaner.clean(app.infra.connectionFactory(), done);
    });

    after( (done) => {
        var dbCleaner = new DatabaseCleaner('mysql');
        dbCleaner.clean(app.infra.connectionFactory(), done);
    });

    it('
    ...
```
Possibilidades de momentos, em ordem de precedência:

* before: rode um código ants de todos os testes
* beforeEach: roda um código antes de cada teste
* afterEach: rode um código depois de cada teste
* after: rode um código depois de todos os testes

# Aula 5

## Conceitos

* O **WebSocket** veio depois do ServerSideEvents, faz o que ele faz com mais recursos. Enquanto o http é mias sobre texto, já o WebSocket é binário, fullduplex. Deixar a conexão aberta - Long Polling - podendo o servidor enviar informações para o cliente, sem a necessidade de uma nova requisição.

    * Além do servidor poder notificar o cliente, o cliente também pode enviar informações para o servidor
    * A comunicação é feita baseada em um novo protocolo, especĩfico para o WebSocket
    * API padrão para ser usada dentro do navegador, ao invés de ficar simulando requisição AJAX.
    * Suporte a partir do Chrome 16+ (out/2011), Firefox 11+ (jan/2012), IE10+ (set/2012)

* **Midleware** - O express segue um conceito de ser um servidor minimalista. Com o método use(), são adicionadas funcionalidades a nossa aplicação. Para o express ele é algo bem simples, seria algo que trabalha com um request antes de chegar nas rotas, ou seja, são interceptors que ficam entre o Express em si mas antes de chegar na Rota, adicionando verificações e comportamentos sobre ele. O momento que ela vai ser executada depende de onde você invocar. 

## WebSockets

Instlar o suporte a WebSocket: socket.io

```bash
 npm install socket.io --save
```

Mudar o servidor para carregar e funcionar com o WebSocket

server.js
```js
const app = require('./custom-express')();

const http = require('http').Server(app); //para poder criar o websockert
const io = require('socket.io')(http); //para usar o websocket
// seta chave-valor, permite pegar o io na rota promocoes
app.set('io', io); 

//app.listen(porta, () => { // substitui por http, permitindo o uso do WebSocket
http.listen(porta, () => {
    console.log(`Servidor executando em http://${ip}:${porta}`);
});
```

Cria um formulário só para poder enviar os dados para a página principal, mas ainda não é o evento, este formulário será recebido na rota promocoes.js, e lá sim será recebido os dados do formulário para montar o envento e enviar os dados

views\promocoes\form.ejs
```html
    <form action="/promocoes" method="post">
        <div>
            <input type="text" name="mensagem" id="mensagem">
        </div>
        <div>
            <select name="livro[titulo]">
                <% lista.forEach((livro) => { %>
                    <option value="<%= livro.titulo %>"><%= livro.titulo %></option>
                <% }); %> 
            </select>
        </div>
        <input type="submit" value="Promoções relâmpago">
    </form>
```

Envia um Evento usando o socket.io. No caso, ao definir uma promoção em uma possível página adminsitrativa será enviado um evento em "tempo-real" para os usuários que estão interagindo na página principal:

routes\promocoes.js
```js
    ...
    app.post('/promocoes', (req, res, next) => {
        const promocao = req.body;

        app.get('io').emit('novaPromocao', promocao);

        res.redirect('/promocoes/form')
    });
```
*obs.1*: disparando o WebSocket, para avisar os navegadores que estão na página principal

*obs.2*: "io" foi setado em server.js, obtem o acesso a instância do io

*obs.3*: "novaPromocao" é a tag do evento, será capturado na pagina principal: index.ejs

Por fim, na página que vai receber as notificações, é preciso importar o socket.io e configurar o recebimento do Evento emitido em promocoes.js

\views\home\index.eps
```html
...
</footer>
<script src="/socket.io/socket.io.js"></script>
<script>
    const socket = io();
    socket.on('novaPromocao', (dados) => {
        console.log('Nova promoção!');
        console.log(dados);
        alert('Nova promoção! É para acabar: ' + dados.mensagem);
    });
</script>
</body>
</html>
```

## Midleware

\custom-express.js

```js
    // Página não encontrada (404)
    // Detalhe que ele identifica que a página não
    // foi encontrada pela qtde de parâmetros: 3
    app.use( function(req, res, next) {
        res.status(404).render('erros/404');
    });

    // Erro Interno do Servidor (500)
    // A diferença está nos parâmetros, com 4 param temos o
    // error, que representa casos com erro no servidor
    app.use( (error, req, res, next) => {
        console.error('Erro no middleware');
        console.error(error);
        res.status(500).render('erros/500');
    });
```