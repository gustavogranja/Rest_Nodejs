class Tabelas {
    init(conexao) {
        this.conexao = conexao

        this.criarAtendimento()
        this.criarPets()
    }

    criarAtendimento() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimento (id int NOT NULL AUTO_INCREMENT, cliente varchar(11) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data_agendamento datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            }else {
                console.log('Tabela Atendimento criada com sucesso!')
            }
        })
    }

    criarPets() {
        const query = 'CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, nome varchar(50), imagem varchar(1000), PRIMARY KEY (id))'

        this.conexao.query(query, erro => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela Pets criada com Sucesso')
            }
        })
    }


}


module.exports = new Tabelas