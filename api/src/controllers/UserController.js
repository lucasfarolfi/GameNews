const User = require("../services/User")
const UserService = require("../services/UserService")
const userConstants = require("../constants/userConstants")
const serverConstants = require("../constants/serverConstants")
const verifyData = require("../utils/verifyData")
const secret = require("../utils/JWTSecret")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")

class UserController{
    async find_all(req, res){
        try{
            let response = await UserService.find_all()
            return res.status(response.status).json(response.data)
        }catch(e){
            console.log(e)
            return res.status(500).json({msg: serverConstants.internalError})
        }
    }

    async find_one(req, res){
        try{
            let response = await UserService.find_one(req)
            return res.status(response.status).json(response.data)
        }catch(e){
            console.log(e)
            return res.status(500).json({msg: serverConstants.internalError})
        }
    }

    async create(req, res){
        try{
            let response = await UserService.create(req)
            return res.status(response.status).json(response.data)
        }catch(e){
            return res.status(500).json({msg: serverConstants.internalError})
        }
    }

    async update_user(req, res){
        try{
            let response = await UserService.update_user(req)
            return res.status(response.status).json(response.data)
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
}

module.exports = new UserController()