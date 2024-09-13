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

// Atualizar cliente existente
exports.updateCliente = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email, senha, tipo, curso_departamento } = req.body;

    db.query(
        'UPDATE clientes SET nome = ?, email = ?, senha = ?, tipo = ?, curso_departamento = ? WHERE id = ?',
        [nome, email, senha, tipo, curso_departamento, id],
        (err, results) => {
            if (err) {
                console.error('Erro ao atualizar cliente:', err);
                res.status(500).json({ message: 'Erro ao atualizar cliente' });
                return;
            }
            if (results.affectedRows > 0) {
                res.json({ id, nome, email, tipo, curso_departamento });
            } else {
                res.status(404).json({ message: 'Cliente não encontrado' });
            }
        }
    );
};

// Excluir cliente
exports.deleteCliente = (req, res) => {
    const id = parseInt(req.params.id);
    db.query('DELETE FROM clientes WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Erro ao excluir cliente:', err);
            res.status(500).json({ message: 'Erro ao excluir cliente' });
            return;
        }
        if (results.affectedRows > 0) {
            res.status(204).send(); // Resposta com código 204 (No Content) para exclusão bem-sucedida
        } else {
            res.status(404).json({ message: 'Cliente não encontrado' });
        }
    });
};

