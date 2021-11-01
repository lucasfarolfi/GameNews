const User = require("../services/User")
const verifyUserAuth = require("../utils/verifyUserAuthenticated")

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
/*
    async findAllCategories(req, res){
        let {userId} = req.params
        let query = await User.findAllCategories(userId)
        if(query.msg) return res.status(query.code).json({msg: query.msg})
            
        return res.status(query.code).json({categories: query.categories})
    }
 
    async findOne(req, res){
        let {userId, categoryId} = req.params

        let query = await User.findOne(id)
        if(!query.status){
            return res.status(query.code).json({msg: query.msg})
        }
        return res.status(query.code).json({user: query.user})
    }*/

}

module.exports = new UserController()