const { ne } = require('sequelize/types/lib/operators')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')

class Serializador {
    json (dados) {
        return JSON.stringify(dados)
    }

    serializador (dados) {
        if (this.contentType === 'application/json') {
            return this.json(dados)
        }
        
        throw new ValorNaoSuportado(this.contentType)
    }    
}