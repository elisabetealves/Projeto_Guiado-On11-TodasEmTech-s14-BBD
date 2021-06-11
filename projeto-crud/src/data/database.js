const mongoose = require('mongoose')
require('dotenv').config()

const connect = () => { mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log('Mongo db conectado')).catch(err => console.err)
}

module.exports = { connect }