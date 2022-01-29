const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const app = express()
const PORT = config.get("api.port")

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send(
        JSON.stringify(`Olá mundo`)
    )
})

app.listen(PORT, () => {
    console.log(`Servidor na porta ${PORT}`)
})

