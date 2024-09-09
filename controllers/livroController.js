const db = require('../db');

// Listar todos os livros
exports.getLivros = (req, res) => {
    db.query('SELECT * FROM livros', (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Erro ao buscar livros' });
            return;
        }
        res.json(results);
    });
};

// Obter livro por ID
exports.getLivroById = (req, res) => {
    const id = parseInt(req.params.id);
    db.query('SELECT * FROM livros WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Erro ao buscar livro' });
            return;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: 'Livro não encontrado' });
        }
    });
};

// Adicionar novo livro
exports.createLivro = (req, res) => {
    const { titulo, autor, genero, quantidadeEmEstoque } = req.body;
    db.query(
        'INSERT INTO livros (titulo, autor, genero, quantidade_em_estoque) VALUES (?, ?, ?, ?)',
        [titulo, autor, genero, quantidadeEmEstoque],
        (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Erro ao adicionar livro' });
                return;
            }
            res.status(201).json({ id: results.insertId, titulo, autor, genero, quantidadeEmEstoque });
        }
    );
};

// Atualizar livro existente
exports.updateLivro = (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, autor, genero, quantidadeEmEstoque } = req.body;
  db.query(
      'UPDATE livros SET titulo = ?, autor = ?, genero = ?, quantidade_em_estoque = ? WHERE id = ?',
      [titulo, autor, genero, quantidadeEmEstoque, id],
      (err, results) => {
          if (err) {
              console.error('Erro ao atualizar livro:', err); // Adicione este log para depuração
              res.status(500).json({ message: 'Erro ao atualizar livro' });
              return;
          }
          if (results.affectedRows > 0) {
              res.json({ id, titulo, autor, genero, quantidadeEmEstoque });
          } else {
              res.status(404).json({ message: 'Livro não encontrado' });
          }
      }
  );
};


// Excluir livro
exports.deleteLivro = (req, res) => {
    const id = parseInt(req.params.id);
    db.query('DELETE FROM livros WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Erro ao excluir livro' });
            return;
        }
        if (results.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Livro não encontrado' });
        }
        
    });
};
