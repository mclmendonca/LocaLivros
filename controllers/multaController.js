const db = require('../db');

// Adicionar multa ao cliente
exports.adicionarMulta = (req, res) => {
    const { id_cliente, id_livro, valor, data_vencimento } = req.body;

    db.query(
        'INSERT INTO multas (id_cliente, id_livro, valor, data_vencimento, status_pagamento) VALUES (?, ?, ?, ?, "Pendente")',
        [id_cliente, id_livro, valor, data_vencimento],
        (err, results) => {
            if (err) {
                console.error('Erro ao adicionar multa:', err);
                res.status(500).json({ message: 'Erro ao adicionar multa' });
            } else {
                res.status(201).json({ message: 'Multa adicionada com sucesso' });
            }
        }
    );
};

// Atualizar o status de pagamento da multa
exports.pagarMulta = (req, res) => {
    const id = parseInt(req.params.id);
    const { forma_pagamento } = req.body;

    db.query(
        'UPDATE multas SET status_pagamento = "Pago", data_pagamento = NOW(), forma_pagamento = ? WHERE id = ?',
        [forma_pagamento, id],
        (err, results) => {
            if (err) {
                console.error('Erro ao pagar multa:', err);
                res.status(500).json({ message: 'Erro ao pagar multa' });
            } else if (results.affectedRows > 0) {
                res.json({ message: 'Multa paga com sucesso' });
            } else {
                res.status(404).json({ message: 'Multa não encontrada' });
            }
        }
    );
};

// Listar multas pendentes
exports.listarMultasPendentes = (req, res) => {
    db.query(
        'SELECT * FROM multas WHERE status_pagamento = "Pendente"',
        (err, results) => {
            if (err) {
                console.error('Erro ao listar multas:', err);
                res.status(500).json({ message: 'Erro ao listar multas' });
            } else {
                res.json(results);
            }
        }
    );
};

// Listar multas pagas
exports.listarMultasPagas = (req, res) => {
  db.query(
      'SELECT * FROM multas WHERE status_pagamento = "Pago"',
      (err, results) => {
          if (err) {
              console.error('Erro ao listar multas pagas:', err);
              res.status(500).json({ message: 'Erro ao listar multas pagas' });
          } else {
              res.json(results);
          }
      }
  );
};

