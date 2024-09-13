// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const secretKey = 'secreta'; // Deve ser mantida em um local seguro, como variáveis de ambiente

module.exports = (req, res, next) => {
    // Obtenha o token do cabeçalho Authorization
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    
    if (!token) {
        return res.status(403).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    // Verifique o token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido.' });
        }

        // Adicione os dados do usuário ao request
        req.user = decoded;
        next(); // Continue para o próximo middleware ou rota
    });
};
