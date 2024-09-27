const request = require('supertest');
const server = require('../server'); // O arquivo principal do express
const chai = require('chai');
const expect = chai.expect;

describe('AuthController - Login', () => {
  
    it('Deve realizar login com sucesso e retornar um token', (done) => {
        request(server)
            .post('/api/auth/login')
            .send({ email: 'usuario@exemplo.com', senha: 'senha123' })
            .expect(200)
            .then((res) => {
                const token = res.body.token;
                expect(token).to.be.a('string');
                done();
            });
    });

    it('Deve retornar erro 401 para credenciais inválidas', (done) => {
        request(server)
            .post('/api/auth/login')
            .send({ email: 'usuario@exemplo.com', senha: 'senhaErrada' })
            .expect(401)
            .then((res) => {
                expect(res.body.message).to.equal('Credenciais inválidas');
                done();
            });
    });

    it('Deve acessar rota protegida com token válido', (done) => {
        request(server)
            .post('/api/auth/login')
            .send({ email: 'usuario@exemplo.com', senha: 'senha123' })
            .then((res) => {
                const token = res.body.token;
                request(server)
                    .get('/clientes')
                    .set('Authorization', `Bearer ${token}`)
                    .expect(200, done);
            });
    });

    it('Deve retornar erro 403 para rota protegida sem token', (done) => {
        request(server)
            .get('/clientes')
            .expect(403)
            .then((res) => {
                expect(res.body.message).to.equal('Acesso negado. Token não fornecido.');
                done();
            });
    });
});
