const db = require('../db');

// Adicionar cliente (Aluno ou Professor)
exports.adicionarCliente = (req, res) => {
    const { nome, email, senha, tipo, curso_departamento } = req.body;

    db.query(
        'INSERT INTO clientes (nome, email, senha, tipo, curso_departamento) VALUES (?, ?, ?, ?, ?)',
        [nome, email, senha, tipo, curso_departamento],
        (err, results) => {
            if (err) {
                console.error('Erro ao adicionar cliente:', err);
                res.status(500).json({ message: 'Erro ao adicionar cliente' });
            } else {
                res.status(201).json({ message: 'Cliente adicionado com sucesso' });
            }
        }
    );
};

// Listar todos os clientes
exports.listarClientes = (req, res) => {
    db.query('SELECT * FROM clientes', (err, results) => {
        if (err) {
            console.error('Erro ao listar clientes:', err);
            res.status(500).json({ message: 'Erro ao listar clientes' });
        } else {
            res.json(results);
        }
    });
};
