const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'gustavogm',
    password: 'Gustavo08',
    database: 'agenda_petshop'
})

module.exports = conexao