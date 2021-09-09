const Router = require('express').Router()
const NewsController = require('./controllers/NewsController')
const CategoryController = require('./controllers/CategoryController')
const UserController = require('./controllers/UserController')

//News
Router.get("/noticias", NewsController.findAll)
Router.post("/noticia", NewsController.create)

//Category
Router.get("/categorias", CategoryController.findAll)
Router.post("/categoria", CategoryController.create)

//User
Router.get("/usuarios", UserController.findAll)
Router.post("/usuario", UserController.create)
Router.delete("/usuario/:id", UserController.delete)
Router.put("/usuario", UserController.updatePassword)
Router.patch("/admin/usuario/:id", UserController.updateUser)

module.exports = Router