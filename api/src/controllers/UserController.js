<<<<<<< HEAD
const User = require("../services/User")
const verifyUserAuth = require("../utils/verifyUserAuthenticated")
=======
const User = require("../models/User")
const userConstants = require("../constants/userConstants")
const serverConstants = require("../constants/serverConstants")
const verifyData = require("../utils/verifyData")
>>>>>>> parent of adf9889 (Created auth Middlewares and use JWT)

class UserController{
    async findAll(req, res){
        let service = await User.findAll()
        return res.status(service.code).json(service.response)
    }

    async findOne(req, res){
        let {id} = req.params
        let service = await User.findOne(id)
        return res.status(service.code).json(service.response)
    }

    async create(req, res){
        let {name, email,password} = req.body
        let service = await User.create(name,email,password)
        return res.status(service.code).json(service.response)
    }

    async updateUser(req, res){
        let id = req.params.id
        let {name, email, password, role} = req.body
        let service = await User.update(id, name, email, password, role)
        return res.status(service.code).json(service.response)
    }
    
    async delete(req, res){
        let {id} = req.params
        let service = await User.delete(id)
        return res.status(service.code).json(service.response)
    }
    
    async login(req, res){
        let {email, password} = req.body
        let service = await User.validateUser(email, password)
        return res.status(service.code).json(service.response)
    }

    async findUserCategories(req, res){
        let {id} = req.params
        let user_auth = verifyUserAuth(req.headers.authorization)
        let service = await User.findCategories(id, user_auth.id, user_auth.role) 
        return res.status(service.code).json(service.response)
    }
 
    async findUserNews(req, res){
        let {id} = req.params
        let user_auth = verifyUserAuth(req.headers.authorization)
        let service = await User.findNews(id, user_auth.id, user_auth.role)
        return res.status(service.code).json(service.response)
    }

}

module.exports = new UserController()