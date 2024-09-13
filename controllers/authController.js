const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const secretKey = 'secreta'; // Mantenha em um local seguro

// Função para login
exports.login = (req, res) => {
    const { email, senha } = req.body;

    db.query('SELECT * FROM clientes WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao verificar usuário' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const cliente = results[0];

        bcrypt.compare(senha, cliente.senha, (err, match) => {
            if (err || !match) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            // Gerar token
            const token = jwt.sign({ id: cliente.id, tipo: cliente.tipo }, secretKey, { expiresIn: '1h' });
            res.json({ token });
        });
    });
};
