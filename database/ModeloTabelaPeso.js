const Sequelize = require('sequelize')
const conexao = require('./index')
const campos = {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    altura: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    peso: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: "tb_pessoa",
    timestamps: true,
    updatedAt: "dataAtualizacao",
    createdAt: "dataCriacao",
    version: "versao"
    
}

module.exports = conexao.define('tb_pessoa', campos, opcoes)