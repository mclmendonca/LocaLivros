const request = require('supertest');
const server = require('../server'); // O arquivo principal do express
const chai = require('chai');
const expect = chai.expect;

describe('MultaController - Operações com Multas', function() {
  this.timeout(5000); // Aumenta o tempo limite para todos os testes neste describe

  it('Deve adicionar uma multa com sucesso', (done) => {
      request(server)
          .post('/api/multas')
          .send({
              idCliente: 1,
              valor: 50.0,
              descricao: 'Atraso de 5 dias'
          })
          .expect(201)
          .then((res) => {
              expect(res.body.message).to.equal('Multa adicionada com sucesso.');
              done();
          })
          .catch((err) => done(err)); // Captura qualquer erro e chama done()
  });
});
