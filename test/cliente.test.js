const request = require('supertest');
const server = require('../server'); // O arquivo principal do express
const chai = require('chai');
const expect = chai.expect;

describe('ClienteController - Operações com Clientes', () => {
  it('Deve adicionar um cliente com sucesso', (done) => {
      request(server)
          .post('/clientes')
          .send({
              nome: 'Cliente Teste',
              email: 'cliente@exemplo.com',
              senha: 'senha123'
          })
          .expect(201)
          .then((res) => {
              expect(res.body.message).to.equal('Cliente adicionado com sucesso.');
              done();
          });
  });
});
it('Deve atualizar informações de um cliente', (done) => {
  const token = 'token-valido';
  request(server)
      .put('/clientes/1')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Cliente Atualizado' })
      .expect(200)
      .then((res) => {
          expect(res.body.message).to.equal('Cliente atualizado com sucesso.');
          done();
      });
});
