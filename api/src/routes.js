const Router = require('express').Router()
const NewsController = require('./controllers/NewsController')
const CategoryController = require('./controllers/CategoryController')
const UserController = require('./controllers/UserController')
const Validation = require("./utils/RequestValidation")
const LoginController = require('./controllers/LoginController')
const Authorization = require("./middleware/Authorization")

//News
Router.get("/noticias", NewsController.get_all)
Router.get("/noticias/id/:id", Validation.id, NewsController.get_by_id)
Router.get("/noticias/slug/:slug", Validation.slug, NewsController.find_by_slug)
Router.post("/noticias", Authorization([1, 2]),Validation.create_news, NewsController.create)
Router.delete("/noticias/:id", Authorization([1, 2]), Validation.id, NewsController.delete)
Router.put("/noticias/:id", Authorization([1, 2]), Validation.update_news, NewsController.update)

//Category
Router.get("/categorias", CategoryController.get_all)
Router.get("/categorias/id/:id", Validation.id, CategoryController.get_by_id)
Router.get("/categorias/slug/:slug", Validation.slug, CategoryController.find_by_slug)
Router.post("/categorias", Authorization([1, 2]), Validation.create_category, CategoryController.create)
Router.put("/categorias/:id", Authorization([1, 2]), Validation.update_category, CategoryController.update)
Router.delete("/categorias/:id", Authorization([1]), Validation.id, CategoryController.delete)

//User
Router.get("/usuarios", Authorization([1]), UserController.get_all)
Router.get("/usuarios/:id", Authorization([1]), Validation.id, UserController.get_by_id)
Router.post("/usuarios", Validation.create_user, UserController.create)
Router.delete("/usuarios/:id", Authorization([1]), Validation.id, UserController.delete)
Router.put("/usuarios/:id", Authorization([1]), Validation.update_user, UserController.update)

// Login
Router.post("/login", Validation.login, LoginController.login)

module.exports = Router