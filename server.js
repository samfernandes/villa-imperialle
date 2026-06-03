const express = require('express');
const mysql = require('mysql2');

const app = express();

const conexao = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'insg',
    database: 'VillaImperialle'
});