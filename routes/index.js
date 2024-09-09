const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');
const multaController = require('../controllers/multaController');
const clienteController = require('../controllers/clienteController');



router.get('/livros', livroController.getLivros);

router.get('/livros/:id', livroController.getLivroById);

router.post('/livros', livroController.createLivro);

router.put('/livros/:id', livroController.updateLivro);

router.delete('/livros/:id', livroController.deleteLivro);



// Rota para adicionar uma multa
router.post('/multas', multaController.adicionarMulta);

// Rota para pagar uma multa
router.put('/multas/:id/pagar', multaController.pagarMulta);

// Rota para listar multas pendentes
router.get('/multas/pendentes', multaController.listarMultasPendentes);

// Rota para listar multas pagas
router.get('/multas/pagas', multaController.listarMultasPagas); 



// Rotas de Clientes
router.post('/clientes', clienteController.adicionarCliente);
router.get('/clientes', clienteController.listarClientes);

// Rotas de Multas
router.post('/multas', multaController.adicionarMulta);
router.put('/multas/:id/pagar', multaController.pagarMulta);
router.get('/multas/pendentes', multaController.listarMultasPendentes);



module.exports = router;

