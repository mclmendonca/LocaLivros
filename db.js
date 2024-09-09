const mysql = require('mysql2');

// Configuração da conexão
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Seu usuário do MySQL
    password: 'P@ssw0rd', // Sua senha do MySQL
    database: 'loclivros'
});

// Conectar ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

module.exports = connection;
