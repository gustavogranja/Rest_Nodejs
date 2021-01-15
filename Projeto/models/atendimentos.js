const moment = require('moment')
const axios = require('axios')
const conexao = require('../infraestrutura/database/conexao')
const repositorio = require('../repositorios/atendimentos')

class Atendimento {
    constructor() {

        this.dataEhValida = ({data_agendamento, dataCriacao}) => moment(data_agendamento).isSameOrAfter(dataCriacao)
        this.clienteEhValido = (tamanho) => tamanho >= 5
        this.valida = parametros => this.validacoes.filter(campo => {
            const { nome } = campo
            const parametro = parametros[nome]

            return !campo.valido(parametro)
        })

        this.validacoes = [
            {
                nome: 'data_agendamento',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]
    }

    adiciona(atendimento) {
        
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data_agendamento = moment(atendimento.data_agendamento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const parametros = {
            data_agendamento: { data_agendamento, dataCriacao },
            cliente: { tamanho: atendimento.cliente.length }
        }

        const erros = this.valida(parametros)
        const existemErros = erros.length

        if(existemErros) {
            return new Promise((resolve, reject) => reject(erros))
        } else {
            
            const atendimentoDatado = {...atendimento, dataCriacao, data_agendamento}
            
            return repositorio.adiciona(atendimentoDatado)
                .then(resultados => {
                    const id = resultados.insertId
                    return ({ ...atendimento, id})
                })
        }
      
    }

    lista() {
       return repositorio.lista()
    }

    buscaPorID(id) {
    
        conexao,query(sql, async (erro, resultados) => {
            const atendimento = resultados[0]
            const cpf = atendimento.cliente
            if (erro) {
                res.status(400).json(erro)
            } else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`)
    
                atendimento.cliente = data
    
                res.status(200).json(atendimento)
            }
        })
    }



    altera(id, valores, res) {
        if(valores.data_agendamento) {
            valores.data_agendamento = moment(valores.data_agendamento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        const sql = 'UPDATE Atendimento SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    } 

    deleta(id, res) {
        const sql = 'DELETE FROM Atendimento WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento