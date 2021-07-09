const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

describe('Login de empresa', function() {
    it('realiza o login de admin de empresa e redireciona para o menu inicial (código: 302)', async function() {

        await request.post('/login/empresa')
        .send({
            "email": "franciscogrynberg34@gmail.com",
            "password": "12345678",
        })
        .then(function(res) {
            expect(302);
            expect(res.text).toEqual('Found. Redirecting to /admin')
        });

    });

    it('tenta realizar o login com senha errada e redireciona novamente para página de login (código: 302)', async function() {

        await request.post('/login/empresa')
        .send({
            "email": "franciscogrynberg34@gmail.com",
            "password": "senha123",
        })
        .then(function(res) {
            expect(302);
            expect(res.text).toEqual('Found. Redirecting to /login/empresa');
        });

    });

    it('tenta realizar o login com usuário errado e redireciona novamente para página de login (código: 302)', async function() {

        await request.post('/login/empresa')
        .send({
            "email": "email@gmail.com",
            "password": "12345678",
        })
        .then(function(res) {
            expect(302);
            expect(res.text).toEqual('Found. Redirecting to /login/empresa');
        });

    });

});

