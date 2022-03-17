const Router = require('express').Router()
const NewsController = require('./controllers/NewsController')
const CategoryController = require('./controllers/CategoryController')
const UserController = require('./controllers/UserController')
const Validation = require("./utils/RequestValidation")
const LoginController = require('./controllers/LoginController')
const Authorization = require("./middleware/Authorization")
const Upload = require('./middleware/MulterConfig');
const ERole = require("./utils/ERole")

//News
Router.get("/noticias", Validation.pagination, NewsController.get_all)
Router.get("/noticias/id/:id", Validation.id, NewsController.get_by_id)
Router.get("/noticias/slug/:slug", Validation.slug, NewsController.find_by_slug)
Router.post("/noticias", Authorization([ERole.ADMIN, ERole.JOURNALIST]),Validation.create_news, Upload.single('file'), NewsController.create)
Router.delete("/noticias/:id", Authorization([ERole.ADMIN, ERole.JOURNALIST]), Validation.id, NewsController.delete)
Router.put("/noticias/:id", Authorization([ERole.ADMIN, ERole.JOURNALIST]), Validation.update_news, Upload.single('file'), NewsController.update)

//Category
Router.get("/categorias", Validation.pagination, CategoryController.get_all)
Router.get("/categorias/id/:id", Validation.id, CategoryController.get_by_id)
Router.get("/categorias/slug/:slug", Validation.slug, CategoryController.find_by_slug)
Router.post("/categorias", Authorization([ERole.ADMIN, ERole.JOURNALIST]), Validation.create_category, CategoryController.create)
Router.put("/categorias/:id", Authorization([ERole.ADMIN, ERole.JOURNALIST]), Validation.update_category, CategoryController.update)
Router.delete("/categorias/:id", Authorization([ERole.ADMIN]), Validation.id, CategoryController.delete)

//User
Router.get("/usuarios", Authorization([ERole.ADMIN]), Validation.pagination, UserController.get_all)
Router.get("/usuarios/:id", Authorization([ERole.ADMIN]), Validation.id, UserController.get_by_id)
Router.post("/usuarios", Validation.create_user, UserController.create)
Router.delete("/usuarios/:id", Authorization([ERole.ADMIN]), Validation.id, UserController.delete)
Router.put("/usuarios/:id", Authorization([ERole.ADMIN]), Validation.update_user, UserController.update)

// Login
Router.post("/login", Validation.login, LoginController.login)

module.exports = Router