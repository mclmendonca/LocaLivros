const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'secreta'; // Variável de ambiente para a chave secreta

// Função para login
exports.login = (req, res) => {
    const { email, senha } = req.body;

    db.query('SELECT * FROM clientes WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Erro ao verificar usuário:', err);
            return res.status(500).json({ message: 'Erro ao verificar usuário' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const cliente = results[0];

        bcrypt.compare(senha, cliente.senha, (err, match) => {
            if (err || !match) {
                console.error('Erro ao comparar senha:', err);
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            // Gerar token com mais informações no payload
            const token = jwt.sign({ id: cliente.id, tipo: cliente.tipo, email: cliente.email }, secretKey, { expiresIn: '1h' });
            res.json({ token });
        });
    });
};
