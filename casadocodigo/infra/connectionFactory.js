const mysql = require('mysql');

function createPool() {

    let databaseName = 'casadocodigo';

    if(process.env.NODE_ENV == 'test') {
        databaseName = 'casadocodigo_teste';
    }

    console.log("Ambiente Node: " + process.env.NODE_ENV);
    console.log("Usando BD: " + databaseName);

    //return mysql.createConnection({
    return mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: databaseName,
        connectionLimit: 10, // padrao sem colocar é 10
        queueLimit: 0,
        acquireTimeout: 10000
    });
}

//module.exports = createPool;
module.exports =  function () {
    return createPool;
}