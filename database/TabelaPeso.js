const Modelo = require('./ModeloTabelaPeso')

module.exports = {
    inserir(pessoa) {
        return Modelo.create(pessoa)
    },

    listarPessoas() {
        return Modelo.findAll({raw: true})
    },

    listarPorId(id) {
        return Modelo.findOne({
            where: {
                id: id
            }
        })
    }
}