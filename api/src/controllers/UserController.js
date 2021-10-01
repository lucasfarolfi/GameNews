const User = require("../models/User")

class UserController{
    async findAll(req, res){
        let query = await User.findAll()
        if(query.msg) return res.status(query.code).json({msg: query.msg})
            
        return res.status(query.code).json({users: query.users})
    }

    async findOne(req, res){
        let {id} = req.params

        let query = await User.findOne(id)
        if(!query.status){
            return res.status(query.code).json({msg: query.msg})
        }
        return res.status(query.code).json({user: query.user})
    }

    async create(req, res){
        let {name, email,password} = req.body

        let query = await User.create(name,email,password)
        return res.status(query.code).json({msg: query.msg})
    }

    async updateUser(req, res){
        let id = req.params.id
        let {name, email, password, role} = req.body

        let query = await User.update(id, name, email, password, role)
        return res.status(query.code).json({msg: query.msg})
    }

    async updatePassword(req, res){
        let {email, password} = req.body

        let query = await User.updatePassword(email,password)
        return res.status(query.code).json({msg: query.msg})
    }

    async delete(req, res){
        let {id} = req.params

        let query = await User.delete(id)
        return res.status(query.code).json({msg: query.msg})
    }
    
    async login(req, res){
        let {email, password} = req.body
            
        let query = await User.validateUser(email, password)
        if(!query.status){
            return res.status(query.code).json({msg: query.msg})
        }
        return res.status(query.code).json({token: query.token})
    }
 
}

module.exports = new UserController()