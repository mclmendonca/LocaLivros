const bcrypt = require('bcryptjs'); // Certifique-se de importar bcrypt no início do seu arquivo


exports.adicionarCliente = (req, res) => {
    const { nome, email, senha, tipo, curso_departamento } = req.body;

    // Criptografar a senha
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Erro ao criptografar a senha:', err);
            return res.status(500).json({ message: 'Erro ao adicionar cliente' });
        }

        db.query(
            'INSERT INTO clientes (nome, email, senha, tipo, curso_departamento) VALUES (?, ?, ?, ?, ?)',
            [nome, email, hashedPassword, tipo, curso_departamento], // senha criptografada
            (err, results) => {
                if (err) {
                    console.error('Erro ao adicionar cliente:', err);
                    res.status(500).json({ message: 'Erro ao adicionar cliente' });
                } else {
                    res.status(201).json({ message: 'Cliente adicionado com sucesso' });
                }
            }
        );
    });
};


// Listar todos os clientes
exports.listarClientes = (req, res) => {
    db.query('SELECT * FROM clientes', (err, results) => {
        if (err) {
            console.error('Erro ao listar clientes:', err);
            return res.status(500).json({ message: 'Erro ao listar clientes' });
        }
        res.status(200).json(results);
    });
};

// Atualizar informações do cliente
exports.updateCliente = (req, res) => {
    const { id } = req.params;
    const { nome, email, tipo, curso_departamento } = req.body;

    db.query(
        'UPDATE clientes SET nome = ?, email = ?, tipo = ?, curso_departamento = ? WHERE id = ?',
        [nome, email, tipo, curso_departamento, id],
        (err, results) => {
            if (err) {
                console.error('Erro ao atualizar cliente:', err);
                return res.status(500).json({ message: 'Erro ao atualizar cliente' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            res.status(200).json({ message: 'Cliente atualizado com sucesso' });
        }
    );
};

// Excluir um cliente
exports.deleteCliente = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM clientes WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Erro ao excluir cliente:', err);
            return res.status(500).json({ message: 'Erro ao excluir cliente' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        res.status(200).json({ message: 'Cliente excluído com sucesso' });
    });
};