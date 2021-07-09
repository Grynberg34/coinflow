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

    it('tenta realizar o cadastro com email anteriormente cadastrado na database (código: 400)', async function() {

        await request.post('/cadastro/empresa')
        .send({
            "name": "Empresa Teste Z",
            "email": "franciscogrynberg34@gmail.com",
            "password": "12345678",
            "repeatpassword": "12345678"
        })
        .expect(400);

    });

    it('tenta realizar o cadastro com nome anteriormente cadastrado na database (código: 400)', async function() {

        await request.post('/cadastro/empresa')
        .send({
            "name": "Empresa 1",
            "email": "empresaz@gmail.com",
            "password": "12345678",
            "repeatpassword": "12345678"
        })
        .expect(400);

    });

    it('tenta realizar o cadastro com senhas diferentes entre si (código: 400)', async function() {

        await request.post('/cadastro/empresa')
        .send({
            "name": "Empresa Teste Z",
            "email": "empresaz@gmail.com",
            "password": "12345678",
            "repeatpassword": "senha123"
        })
        .expect(400);

    });


    
});
