const roteador = require('express').Router()
const Pessoa = require('../model/Pessoa')
const TabelaPeso = require('../database/TabelaPeso')
const SerializadorPeso = require('../helper/Serializador').SerializadorPeso

roteador.post('/', async(req, res, next) => {
    try {
        const dadosRecebidos = req.body
        const pessoa = new Pessoa(dadosRecebidos)
        await pessoa.criar()
        const serializador = new SerializadorPeso(
            res.getHeader('Content-Type')
        )
        res.send(
            serializador.serializar(pessoa)
        )
    } catch(erro) {
        next(erro)
    }
})

roteador.get('/:id', async(req, res, next) => {
    try{
        const id = parseInt(req.params.id)
        const pessoa = new Pessoa({id: id})
        await pessoa.carregar()
        res.status(200)
        const serializador = new SerializadorPeso(
            res.getHeader('Content-Type')
        )
        res.send(
            serializador.serializar(pessoa)
        )
    } catch(erro) {
        next(erro)
    }
})


roteador.get('/', async(req, res, next) => {
    try {
        const pessoa = await TabelaPeso.listarPessoas()
        res.status(200)
        const serializador = new SerializadorPeso(
            res.getHeader('Content-Type')
        )
        res.send(
            serializador.serializar(pessoa)
        )
    }catch (erro) {
        next(erro)
    }
})

module.exports = roteador