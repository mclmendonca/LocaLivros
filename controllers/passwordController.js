const db = require('../db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

// Solicitar recuperação de senha
exports.solicitarRecuperacao = (req, res) => {
    const { email } = req.body;
    const token = crypto.randomBytes(32).toString('hex');

    db.query('UPDATE clientes SET reset_token = ?, reset_expires = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE email = ?', [token, email], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao solicitar recuperação' });
        }

        // Enviar e-mail com link de redefinição
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'seuemail@gmail.com',
                pass: 'suasenha'
            }
        });

        const mailOptions = {
            to: email,
            from: 'noreply@loca-livros.com',
            subject: 'Recuperação de Senha',
            text: `Clique no link para redefinir sua senha: http://localhost:3000/resetar/${token}`
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao enviar e-mail' });
            }
            res.json({ message: 'E-mail de recuperação enviado' });
        });
    });
};

// Redefinir senha
exports.redefinirSenha = (req, res) => {
    const { token } = req.params;
    const { novaSenha } = req.body;

    db.query('SELECT * FROM clientes WHERE reset_token = ? AND reset_expires > NOW()', [token], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao redefinir senha' });
        }
        if (results.length === 0) {
            return res.status(400).json({ message: 'Token inválido ou expirado' });
        }

        const cliente = results[0];
        bcrypt.hash(novaSenha, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao criptografar senha' });
            }

            db.query('UPDATE clientes SET senha = ?, reset_token = NULL, reset_expires = NULL WHERE id = ?', [hash, cliente.id], (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao atualizar senha' });
                }
                res.json({ message: 'Senha redefinida com sucesso' });
            });
        });
    });
};
