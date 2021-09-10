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
Router.get("/categoria/:id", CategoryController.findOne)

//User
Router.get("/usuarios", UserController.findAll)
Router.get("/usuario/:id", UserController.findUser)
Router.post("/usuario", UserController.create)
Router.delete("/usuario/:id", UserController.delete)
Router.put("/usuario", UserController.updatePassword)
Router.patch("/admin/usuario/:id", UserController.updateUser)
Router.post("/login", UserController.login)

module.exports = Router