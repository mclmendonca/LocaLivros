const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');

// Rota para solicitar recuperação de senha
router.post('/recuperar', passwordController.solicitarRecuperacao);

// Rota para redefinir senha
router.post('/resetar/:token', passwordController.redefinirSenha);

module.exports = router;
