const Router = require('express').Router()
const NewsController = require('./controllers/NewsController')
const CategoryController = require('./controllers/CategoryController')
const UserController = require('./controllers/UserController')
const LoginController = require("./controllers/LoginController")
const AdminAuth = require("./middleware/AdminAuth")
const Validations = require("./utils/RoutesValidations")

//News
Router.get("/noticias", NewsController.findAll)
Router.get("/noticias/id/:id", NewsController.findById)
Router.get("/noticias/slug/:slug", NewsController.findBySlug)
Router.post("/noticias", NewsController.create)
Router.delete("/noticias/:id", NewsController.delete)
Router.put("/noticias/:id", NewsController.update)

//Category
Router.get("/categorias", CategoryController.findAll)
Router.post("/categorias", CategoryController.create)
Router.get("/categorias/id/:id", CategoryController.findById)
Router.get("/categorias/slug/:slug", CategoryController.findBySlug)
Router.put("/categorias/:id", CategoryController.update)
Router.delete("/categorias/:id", CategoryController.delete)

//User
Router.get("/usuarios", AdminAuth, UserController.find_all)
Router.get("/usuarios/:id", AdminAuth, Validations.id, UserController.find_one)
Router.post("/usuarios", Validations.create_user,UserController.create)
Router.delete("/usuarios/:id", AdminAuth, UserController.delete)
Router.patch("/usuarios", AdminAuth, UserController.updatePassword)
Router.put("/usuarios/:id", Validations.update_user, UserController.update_user)
Router.post("/login", Validations.login, LoginController.login)

module.exports = Router