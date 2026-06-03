const express = require('express');
const mysql = require('mysql2');

const app = express();

// Conexão com o MySQL
const conexao = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'insg',
    database: 'villa_imperialle'
});

// Testa a conexão ao iniciar o servidor
conexao.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar ao MySQL:', erro);
        return;
    }

    console.log('Conectado ao banco Villa Imperialle!');
});

// Rota Principal
app.get('/teste-banco', (req, res) => {
    conexao.query('SELECT NOW() AS data_hora',
        (erro, resultado) => {
            if (erro) {
                console.error('Erro na consulta:',
                    erro);
                return res.status(500).json({
                    sucesso: false,
                    mensagem: 'Erro ao consultar o banco de dados'
                });
            }

            res.json({
                sucesso: true,
                mensagem: 'Conexão com o banco funcionando!',
                resultado: resultado
            });
        });
});

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});