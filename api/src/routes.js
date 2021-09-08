const Router = require('express').Router()
const NewsController = require('./controllers/NewsController')

Router.get("/noticias", NewsController.findAll)
Router.post("/noticia", NewsController.create)

module.exports = Router