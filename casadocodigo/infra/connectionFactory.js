const mysql = require('mysql');

function createPool() {
    //return mysql.createConnection({
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

//module.exports = createPool;
module.exports =  function () {
    return createPool;
}