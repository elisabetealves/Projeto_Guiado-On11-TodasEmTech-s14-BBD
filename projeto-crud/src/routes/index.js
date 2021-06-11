const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.status(200).json({
        "Titulo": "API - {Reprograma} -FavMovies",
        "Version": "1.0.0",
        "Mensagem": "Seja Bem-vindo"    
    })   
})

module.exports = router