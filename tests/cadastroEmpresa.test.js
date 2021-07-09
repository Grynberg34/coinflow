const server = require('../app');
const supertest = require('supertest');
const request = supertest(server);
const connection = require('../db/connection');

describe('Cadastro de empresa', function() {
    it('realiza o cadastro de empresa e redireciona para o login (código: 302)', async function() {

        await request.post('/cadastro/empresa')
        .send({
            "name": "Empresa Teste Z",
            "email": "empresaz@gmail.com",
            "password": "12345678",
            "repeatpassword": "12345678"
        })
        .expect(302);

        connection.query('DELETE FROM empresas WHERE email = "empresaz@gmail.com"');

    });

});
