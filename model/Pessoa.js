const TabelaPeso = require('../database/TabelaPeso')

class Pessoa {
    constructor({id, nome, altura, peso, dataCriacao, dataAtualizacao, versao}) {
        this.id = id,
        this.nome = nome,
        this.altura = altura,
        this.peso= peso,
        this.dataCriacao = dataCriacao,
        this.dataAtualizacao = dataAtualizacao,
        this.versao = versao
    }

    async criar() {
        const pessoa = await TabelaPeso.inserir({
            nome: this.nome,
            altura: this.altura,
            peso: this.peso
        })

        this.dataCriacao = pessoa.dataCriacao
        this.dataAtualizacao = pessoa.dataAtualizacao
        this.versao = pessoa.versao
    }

    async carregar() {
        const resultado = await TabelaPeso.listarPorId(this.id)

        this.id = resultado.id
        this.nome = resultado.nome
        this.altura = resultado.altura
        this.peso = resultado.peso
        this.imc = this.calcularImc(resultado.peso, resultado.altura)
        this.pesoIdeal = this.pesoIdeal()
        this.pesoAhPerder = this.diminuirPeso(this.imc, resultado.altura, resultado.peso)
        this.dataAtualizacao = resultado.dataAtualizacao
        this.dataCriacao = resultado.dataCriacao
        this.versao = resultado.versao
    }

    calcularImc(peso, altura) {
        const imc = (peso / (altura * altura))

        return this.imc = imc.toFixed(2)
    }

    pesoIdeal() {
        let mensagem
        if(this.imc < "18.5") {
            mensagem = `O paciente encontra-se abaixo do peso`
        }
        if(this.imc > 18.5 && this.imc < 25) {
            mensagem = `O paciente encontra-se dentro do peso`
        }
        if(this.imc >= 25) {
            mensagem = `O paciente encontra-se acima do peso`
        }

        return mensagem
    }

    diminuirPeso(imc, altura, peso) {
        const imcIdealUm = ((imc - 18.5) * (altura * altura))
        const imcIdealDois = ((imc - 25) * (altura * altura))
        const pesoIdealUm = peso - imcIdealUm
        const pesoIdealDois = peso - imcIdealDois
        
        return `O peso ideal do paciente deve estar entre ${pesoIdealUm.toFixed(2)} e ${pesoIdealDois.toFixed(2)} Kg`
    }
}

module.exports = Pessoa