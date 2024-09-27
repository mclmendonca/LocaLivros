const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');
const multaController = require('../controllers/multaController');
const clienteController = require('../controllers/clienteController');
const authMiddleware = require('../middleware/authMiddleware');
const authRoutes = require('./authRoutes');
const passwordRoutes = require('./passwordRoutes');

// Usar rotas de recuperação de senha
router.use('/senha', passwordRoutes);

// Usar rotas de autenticação
router.use('/auth', authRoutes);

// LIVROS

// Rota visualizar os livros (não precisa de autenticação)
router.get('/livros', livroController.getLivros);

// Rota para ver um livro específico pelo ID (acesso público)
router.get('/livros/:id', livroController.getLivroById);

// Rota para ADD um livro (protegida por autenticação)
router.post('/livros', authMiddleware, livroController.createLivro);

// Rota para Alterar um livro (protegida por autenticação)
router.put('/livros/:id', authMiddleware, livroController.updateLivro);

// Rota para excluir um livro (protegida por autenticação)
router.delete('/livros/:id', authMiddleware, livroController.deleteLivro);


// CLIENTE

// Rota para ADD um cliente (geralmente pública, para registrar novos clientes)
router.post('/clientes', authMiddleware, clienteController.adicionarCliente);

// Rota para listar clientes (talvez essa deva ser restrita apenas para administradores)
router.get('/clientes', authMiddleware, clienteController.listarClientes);

// Rota protegida para atualizar informações do cliente
router.put('/clientes/:id', authMiddleware, clienteController.updateCliente);

// Rota para excluir um cliente (apenas administradores deveriam poder fazer isso)
router.delete('/clientes/:id', authMiddleware, clienteController.deleteCliente);


// MULTAS

// Rota para adicionar uma multa (protegida)
router.post('/multas', authMiddleware, multaController.adicionarMulta);

// Rota para pagar uma multa (pode ser pública, mas é necessário autenticar)
router.put('/multas/:id/pagar', authMiddleware, multaController.pagarMulta);

// Rota para listar multas pendentes (proteção sugerida)
router.get('/multas/pendentes', authMiddleware, multaController.listarMultasPendentes);

// Rota para listar multas pagas (proteção sugerida)
router.get('/multas/pagas', authMiddleware, multaController.listarMultasPagas);

module.exports = router;
