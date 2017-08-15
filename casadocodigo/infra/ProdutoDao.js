// function ProdutoDao(connection) {
//     this.connection = connection;
// };

// ProdutoDao.prototype.lista = function(callback){
//     this.connection.query('SELECT * FROM livros', callback);
// };

// module.exports = ProdutoDao;

class ProdutoDao {

    constructor(connection){
        this.connection = connection;
    }

    lista(callback) {
        this.connection.query('SELECT * FROM livros', callback);
    }
}

module.exports = ProdutoDao;