const query = require('../infraestrutura/database/queries')

class Atendimento {
    adiciona(atendimento) {
        const sql = 'INSERT INTO Atendimento SET ?'
        query()
    }

    lista() {
        const sql = 'SELECT * FROM Atendimento'

        return query(sql)
    }

    buscarPorId(id) {
        const sql = `SELECT * FROM Atendimentos WHERE id-${id}`
    }
}

module.exports = new Atendimento