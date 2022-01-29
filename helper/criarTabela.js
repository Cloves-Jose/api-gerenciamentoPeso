const ModeloTabela = require('../database/ModeloTabelaPeso')

ModeloTabela
    .sync()
    .then(() => console.log('Tabela tb_pessoa criada com sucesso'))
    .catch(console.log)