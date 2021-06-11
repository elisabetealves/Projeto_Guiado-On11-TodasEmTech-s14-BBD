const mongoose = require('mongoose')
const Studio = require('../models/estudio')


const createStudio = async (req, res) => {
    const studio = new Studio({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        criadoEm: req.body.criadoEm
    })

    const existStudio = await Studio.findOne({ nome: req.body.nome })
    if (existStudio) {
        return res.status(409).json({ error: "Studio is already exists!" })
    }

    try {
        const newStudio = await studio.save()
        res.status(201).json(newStudio)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


const getAllStudio = async (req, res) => {
    try {
        const studio = await Studio.find()
        res.status(200).json(studio)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updateStudio = async (req, res) => {
    const studio = await Studio.findById(req.params.id)

    if (studio == null) {
        return res.status(404).json({ message: 'Studio cannot be found!' })
    }

    if (req.body.nome != null) {
        studio.nome = req.body.nome
    }

    try {
        const studioUpdated = await studio.save()
        res.status(200).json({
            "mensagem": "Studio successfully updated",
            studioUpdated
        })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


const deleteStudio = async (req, res) => {
    const studio = await Studio.findById(req.params.id)

    if (studio == null) {
        return res.status(404).json({ message: 'Studio cannot be found' })
    }

    try {
        await studio.remove()
        res.status(200).json({ message: 'Studio deleted successfully deleted' })

    } catch (err) {
        res.ststus(500).json({ message: err.message })
    }
}



module.exports = {
    createStudio,
    getAllStudio,
    updateStudio,
    deleteStudio
}