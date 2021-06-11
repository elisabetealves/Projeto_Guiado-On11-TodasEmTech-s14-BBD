const express = require("express")
const router = express.Router()
const controller = require("../controllers/tituloController")

router.post("/", controller.createTitle)

router.get("/", controller.getAllTitle)

router.get("/marvel", controller.showTitleMarvel)
router.get("/ghibli", controller.showTitleGhibli)
router.get("/pixar", controller.showTitlePixar)

router.get("/:id", controller.getById)

router.patch("/:id", controller.updateTitle)

router.delete("/:id", controller.deleteTitle)

module.exports = router