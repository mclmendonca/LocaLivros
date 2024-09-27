const request = require('supertest');
const server = require('../server'); // O arquivo principal do express
const chai = require('chai');
const expect = chai.expect;

describe('PasswordController - Recuperação de Senha', () => {
  
  it('Deve solicitar recuperação de senha com sucesso', (done) => {
      request(server)
          .post('/api/senha/recuperar')
          .send({ email: 'usuario@exemplo.com' })
          .expect(200)
          .then((res) => {
              expect(res.body.message).to.equal('Instruções de recuperação de senha enviadas.');
              done();
          });
  });
});
it('Deve retornar erro 404 para email inválido', (done) => {
  request(server)
      .post('/api/senha/recuperar')
      .send({ email: 'emailInvalido@exemplo.com' })
      .expect(404)
      .then((res) => {
          expect(res.body.message).to.equal('Usuário não encontrado.');
          done();
      });
});
it('Deve redefinir a senha com sucesso', (done) => {
  // Simulação de um token gerado previamente
  const token = 'token-valido';
  request(server)
      .post(`/api/senha/resetar/${token}`)
      .send({ novaSenha: 'novaSenha123' })
      .expect(200)
      .then((res) => {
          expect(res.body.message).to.equal('Senha alterada com sucesso.');
          done();
      });
});
it('Deve retornar erro 400 para token inválido', (done) => {
  request(server)
      .post('/api/senha/resetar/token-invalido')
      .send({ novaSenha: 'novaSenha123' })
      .expect(400)
      .then((res) => {
          expect(res.body.message).to.equal('Token inválido ou expirado.');
          done();
      });
});
