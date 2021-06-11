const mongoose = require('mongoose')
const Title = require('../models/titulo')
//const Studio = require('../models/estudio')


const createTitle = async (req, res) => {
    const title = new Titulo({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        genero: req.body.genero,
        descricao: req.body.descricao,
        estudio: req.body.estudio
    })

    //a regra do titulo que já existe
    const existTitle = await Title.findOne({ nome: req.body.nome })
    if (existTitle) {
        return res.status(409).json({ error: "Title is already exists!" })
    }

    //Conferir se o estudio já existe para criar o título
    // const nonexistentStudio = await Studio.findById(req.body.estudio)
    // if (!nonexistentStudio) {
    //     return res.status(406).json({error: "Studio doesn´t exist!"})
    // }

    try {
        const newTitle = await title.save()
        res.status(201).json({
            message: "Title created successfully!",
            newTitle
        })
    } catch (err) {
        res.status(400).json({ message: error.message })
    }
}


const getById = async (req, res) => {
    try {
        const { id } = req.params
        const title = await Title.find(id)

        if (title == undefined || id == " ") {
            return res.status(404).json({
                message: "Invalid id!"
            })
        }
        res.status(200).json(title)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


const getAllTitle = async (req, res) => {
    const title = await Title.find().populate('estudio')
    res.status(200).json(title)
}


const showTitleMarvel = async (req, res) => {
    const titles = await Title.find().populate('estudio')
    const titleFiltrated = titles.filter(title => title.estudio.nome == "marvel")

    res.status(200).json(titleFiltrated)
}


const showTitleGhibli = async (req, res) => {
    const titles = await Title.find().populate('estudio')
    const titleFiltrated = titles.filter(title => title.estudio.nome == "ghibli")

    res.status(200).json(titleFiltrated)
}


const showTitlePixar = async (req, res) => {
    const titles = await Title.find().populate('estudio')
    const titleFiltrated = titles.filter(title => title.estudio.nome == "pixar")

    res.status(200).json(titleFiltrated)
}



const updateTitle = async (req, res) => {

    const title = await Title.findById(req.params.id)
    const body = req.body

    if (title == null) res.status(404).json({ message: 'Title cannot be found!' })

    Object.keys(body).forEach(key => {
        title[key] = body[key]
    })

    try {
        const titleUpdated = await title.save()
        res.status(200).json({
            message: "Títle successfully updated!",
            titleUpdated
        })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


const deleteTitle = async (req, res) => {
    const title = await Title.findById(req.params.id);

    if (title == "" || title == null) {
        return res.status(404).json({ message: "Title cannot be found!" })
    }

    try {
        await title.remove()
        res.status(200).json({ message: "Title deleted successfully!" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    createTitle,
    getAllTitle,
    getById,
    showTitleMarvel,
    showTitleGhibli,
    showTitlePixar,
    updateTitle,
    deleteTitle
}