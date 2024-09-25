const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'secreta'; // Usar variável de ambiente para a chave secreta

module.exports = (req, res, next) => {
    // Obter o token do cabeçalho Authorization
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(403).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    // Verificar o token JWT
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error('Erro ao verificar token:', err);
            return res.status(403).json({ message: 'Token inválido ou expirado.' });
        }

        // Adicionar os dados do usuário ao request
        req.user = decoded;
        next(); // Continue para o próximo middleware ou rota
    });
};
