#create database casadocodigo;
#use casadocodigo;

create table casadocodigo.livros ( 
    id int(11) not null auto_increment, 
    titulo varchar(255) default null, 
    descricao text, 
    preco decimal(10,2) default null, 
    primary key(id) 
);

INSERT INTO casadocodigo.livros(titulo,descricao,preco)
VALUES('Começando com nodejs', 'Livro introdutorio', 39.90);

INSERT INTO casadocodigo.livros(titulo,descricao,preco)
VALUES('Começando com javascript', 'Livro introdutorio JS', 39.90);

INSERT INTO casadocodigo.livros(titulo,descricao,preco)
VALUES('Começando com express', 'Livro introdutorio Express', 39.90);
