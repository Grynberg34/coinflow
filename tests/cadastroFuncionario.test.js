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
            "code": "585e9385-7e15-438b-982c-9eb98f097bab",
            "password": "12345678",
            "repeatpassword": "12345678"
        })
        .expect(302)
        
        connection.query('DELETE FROM funcionarios WHERE email = "usuarioz@gmail.com"');

    });

});

