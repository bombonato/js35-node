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

    it('should list products', (done) => {
        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-Type',/json/) //regex
            .expect(200, done);
    });

    it('should list products in html', (done) => {
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