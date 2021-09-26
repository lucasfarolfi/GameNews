const User = require("../models/User")
const userConstants = require("../constants/userConstants")
const serverConstants = require("../constants/serverConstants")
const verifyData = require("../utils/verifyData")
const secret = require("../utils/JWTSecret")
const jwt = require("jsonwebtoken")

class UserController{
    async findAll(req, res){
        try{
            let users = await User.findAll()
            res.status(200).json(users)
        }catch(e){
            console.log(e)
            res.status(500).json({msg: serverConstants.internalError})
        }
    }

    async findUser(req, res){
        try{
            let {id} = req.params
            
            if(!verifyData.id(id)){
                return res.status(400).json({msg: serverConstants.invalidData})
            }
            id = parseInt(id)

            let user = await User.findOne(id)
            if(user == undefined){
                return res.status(404).json({msg: userConstants.userNotFound})
            }

            res.status(200).json(user)
        }catch(e){
            console.log(e)
            res.status(500).json({msg: serverConstants.internalError})
        }
    }

    async create(req, res){
        try{
            let {name, email,password} = req.body

            //Null input values
            if(!verifyData.createUser(name,email,password)){
                return res.status(400).json({msg: serverConstants.invalidData})
            }
            //Small password
            if(!verifyData.minPassword(password)){
                return res.status(400).json({msg: userConstants.userSmallPassword})
            }

            //Email almost exists
            let findEmail = await User.verifyEmail(email)
            if(findEmail){
                return res.status(406).json({msg: userConstants.userEmailExists})
            }

            await User.create(name,email,password)
            res.status(200).json({status: userConstants.userCreateSuccess})
        }catch(e){
            res.status(500).json({msg: serverConstants.internalError})
        }
    }

    async updateUser(req, res){
        try{
            let id = req.params.id
            let {name, email, password, role} = req.body

            if(!verifyData.updateUser(name,email,role) || !verifyData.id(id)){
                return res.status(400).json({msg: serverConstants.invalidData})
            }

            id = parseInt(id)
            let userExists = await User.verifyId(id)
            if(!userExists){
                return res.status(404).json({msg: userConstants.userNotFound})
            }

            await User.update(id, name, email, password, role)
            res.status(200).json({status: userConstants.userUpdateSuccess})
        }catch(e){
            res.status(500).json({msg: serverConstants.internalError})
        }
    }

    async updatePassword(req, res){
        try{
            let {email, password} = req.body

            if(!verifyData.email_Pass(email,password)){
                return res.status(400).json({msg: serverConstants.invalidData})
            }

            if(!verifyData.minPassword(password)){
                return res.status(401).json({msg: userConstants.userSmallPassword})
            }

            let userExists = await User.verifyEmail(email)
            if(!userExists){
                return res.status(404).json({msg: userConstants.userIncorrect})
            }

            await User.updatePassword(email,password)
            res.status(200).json({status: userConstants.passwordUpdateSuccess})
        }catch(e){
            res.status(500).json({msg: serverConstants.internalError})
        }
    }

    async delete(req, res){
        try{
            let {id} = req.params

            if(!verifyData.id(id)){
                return res.status(400).json({msg: serverConstants.invalidData})
            }
            id = parseInt(id)

            let idExists = await User.verifyId(id)
            if(!idExists){
                return res.status(404).json({msg: userConstants.userIncorrect})
            }

            await User.delete(id)
            res.status(200).json({status: userConstants.userDeleteSuccess})
        }catch(e){
              res.status(500).json({msg: serverConstants.internalError})
        }
    }
    
    async login(req, res){
        try{
            let {email, password} = req.body

            if(!verifyData.email_Pass(email,password)){
                return res.status(400).json({msg: serverConstants.invalidData})
            }

            let findEmail = await User.verifyEmail(email)
            if(!findEmail){
                return res.status(404).json({msg: userConstants.userIncorrect})
            }
            
            let user = await User.validateUser(email, password)
            
            if(user == undefined){
                return res.status(406).json({msg: userConstants.userIncorrectPassword})
            }
            
            let token = jwt.sign({id: user.id, name: user.name, email: user.email, role: user.role}, secret)
            res.status(200).json({token: token})
        }catch(e){
            res.status(500).json({msg: serverConstants.internalError})
        }
    }
}

module.exports = new UserController()