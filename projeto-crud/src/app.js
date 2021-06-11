const express = require("express")
const app = express()

// conectar o mongo com o mongoose 
const db = require("./data/database")
db.connect()

app.use(express.json())

const index = require('./routes/index')
const titulo = require('./routes/routesTitulo')
const estudio = require('./routes/routesEstudio')

app.use('/', index)
app.use('/titulos', titulo)
app.use('/estudios', estudio)

module.exports = app
