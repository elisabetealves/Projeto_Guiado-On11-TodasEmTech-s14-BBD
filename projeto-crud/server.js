const app = require('./src/app')
const PORT = 5555

app.listen(PORT, () => { 
    console.log(`O servidor está rodando na porta ${PORT}`)
})