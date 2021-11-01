const Router = require('express').Router()
const NewsController = require('./controllers/NewsController')
const CategoryController = require('./controllers/CategoryController')
const UserController = require('./controllers/UserController')
const AdminAuth = require("./middleware/AdminAuth")
const AuthorAuth = require("./middleware/AuthorAuth")

//News
Router.get("/noticias", NewsController.findAll)
Router.get("/noticias/id/:id", NewsController.findById)
Router.get("/noticias/slug/:slug", NewsController.findBySlug)
Router.post("/noticias", AuthorAuth, NewsController.create)
Router.put("/noticias/:id", AdminAuth, NewsController.update)
Router.delete("/noticias/:id", AdminAuth, NewsController.delete)

//Category
Router.get("/categorias", CategoryController.findAll)
Router.get("/categorias/id/:id", CategoryController.findById)
Router.get("/categorias/slug/:slug", CategoryController.findBySlug)
Router.post("/categorias", AuthorAuth, CategoryController.create)
Router.put("/categorias/:id", AdminAuth, CategoryController.update)
Router.delete("/categorias/:id", AdminAuth,CategoryController.delete)

//User
Router.get("/usuarios", AdminAuth, UserController.findAll)
Router.get("/usuarios/:id", AdminAuth, UserController.findOne)
Router.post("/usuarios", AdminAuth, UserController.create)
Router.post("/usuarios/login", UserController.login)
Router.put("/usuarios/:id", AdminAuth,UserController.updateUser)
Router.delete("/usuarios/:id", AdminAuth, UserController.delete)

module.exports = Router