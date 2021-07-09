const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

describe('Login de funcionário', function() {
    it('realiza o login de funcionário e redireciona para o menu inicial (código: 302)', async function() {

        await request.post('/login/funcionario')
        .send({
            "email": "franciscogb_34@yahoo.com.br",
            "password": "12345678",
        })
        .then(function(res) {
            expect(302);
            expect(res.text).toEqual('Found. Redirecting to /user')
        });

    });

    it('tenta realizar o login com senha errada e redireciona novamente para página de login (código: 302)', async function() {

        await request.post('/login/funcionario')
        .send({
            "email": "franciscogb_34@yahoo.com.br",
            "password": "senha123",
        })
        .then(function(res) {
            expect(302);
            expect(res.text).toEqual('Found. Redirecting to /login/funcionario');
        });

    });

    it('tenta realizar o login com usuário errado e redireciona novamente para página de login (código: 302)', async function() {

        await request.post('/login/funcionario')
        .send({
            "email": "email@gmail.com",
            "password": "12345678",
        })
        .then(function(res) {
            expect(302);
            expect(res.text).toEqual('Found. Redirecting to /login/funcionario');
        });

    });

});

