const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);
const connection = require('../db/connection');

describe('Cadastro de funcionário', function() {
    it('realiza o cadastro de funcionário e redireciona para o login (código: 302)', async function() {

        await request.post('/cadastro/funcionario')
        .send({
            "name": "Usuário Z",
            "email": "usuarioz@gmail.com",
            "code": "757a8669-5a53-4d27-9092-6604271dbb96",
            "password": "12345678",
            "repeatpassword": "12345678"
        })
        .expect(302)
        
        connection.query('DELETE FROM funcionarios WHERE email = "usuarioz@gmail.com"');

    });

    it('tenta realizar cadastro com código de empresa inválido (status: 400)', async function() {

        await request.post('/cadastro/funcionario')
        .send({
            "name": "Usuário Z",
            "email": "usuarioz@gmail.com",
            "code": "000",
            "password": "12345678",
            "repeatpassword": "12345678"
        })
        .expect(400)

    });

    it('tenta realizar cadastro com senhas diferentes entre si (status: 400)', async function() {

        await request.post('/cadastro/funcionario')
        .send({
            "name": "Usuário Z",
            "email": "usuarioz@gmail.com",
            "code": "585e9385-7e15-438b-982c-9eb98f097bab",
            "password": "12345678",
            "repeatpassword": "senha123"
        })
        .expect(400)

    });
    
    it('tenta realizar o cadastro com email anteriormente cadastrado na database (código: 400)', async function() {

        await request.post('/cadastro/funcionario')
        .send({
            "name": "Usuário Z",
            "email": "franciscogb_34@yahoo.com.br",
            "code": "585e9385-7e15-438b-982c-9eb98f097bab",
            "password": "12345678",
            "repeatpassword": "12345678"
        })
        .expect(400)

    });

    it('tenta realizar o cadastro com nome anteriormente cadastrado na database (código: 400)', async function() {

        await request.post('/cadastro/funcionario')
        .send({
            "name": "Funcionário 1",
            "email": "usuarioz@gmail.com",
            "code": "585e9385-7e15-438b-982c-9eb98f097bab",
            "password": "12345678",
            "repeatpassword": "12345678"
        })
        .expect(400)

    });
});

