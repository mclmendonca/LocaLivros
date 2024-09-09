const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');
const multaController = require('../controllers/multaController');
const clienteController = require('../controllers/clienteController');

// LIVROS

// Rota visualizar os livros
router.get('/livros', livroController.getLivros);

// Rota para ver um livro específico pelo ID
router.get('/livros/:id', livroController.getLivroById);

// Rota para ADD um livro
router.post('/livros', livroController.createLivro);

// Rota para Alterar um livro
router.put('/livros/:id', livroController.updateLivro);

// Rota para excluir um livro
router.delete('/livros/:id', livroController.deleteLivro);


// CLIENTE

// Rota para ADD um cliente
router.post('/clientes', clienteController.adicionarCliente);

// Rota para listar clientes
router.get('/clientes', clienteController.listarClientes);



// Rota para adicionar uma multa
router.post('/multas', multaController.adicionarMulta);

// Rota para pagar uma multa
router.put('/multas/:id/pagar', multaController.pagarMulta);

// Rota para listar multas pendentes
router.get('/multas/pendentes', multaController.listarMultasPendentes);

// Rota para listar multas pagas
router.get('/multas/pagas', multaController.listarMultasPagas); 


module.exports = router;

