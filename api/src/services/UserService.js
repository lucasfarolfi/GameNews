const User = require("../services/User")
const UserRepository = require("../repository/UserRepository")
const UserConstants = require("../constants/userConstants")
const userConstants = require("../constants/userConstants")
const serverConstants = require("../constants/serverConstants")
const verifyData = require("../utils/verifyData")
const secret = require("../utils/JWTSecret")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")

class UserController{
    async find_all(){
        try{
            let users = await UserRepository.find_all()
            return {status: 200, data: {users}}
        }catch(e){
            console.log(e)
            return {status: 200, data: {msg: serverConstants.internalError}}
        }
    }

    async find_one(req){
        try{
            const validation_errors = validationResult(req)
            if(!validation_errors.isEmpty()){
                return {status: 400, data: {msg: UserConstants.INVALID_DATA}}
            }

            let {id} = req.params

            let user = await UserRepository.find_one(id)
            if(user == undefined){
                return {status: 404, data: {msg: UserConstants.NOT_FOUND}}
            }

            return {status: 200, data: {user}}
        }catch(e){
            console.log(e)
            return {status: 500, data: {msg: serverConstants.internalError}}
        }
    }

    async create(req){
        try{
            // Validation
            const validation_errors = validationResult(req)
            if(!validation_errors.isEmpty()){
                return {status: 400, data: {msg: UserConstants.INVALID_DATA}}
            }

            // User data
            let { name, email,password } = req.body

            // Verify if e-mail already registered
            let findEmail = await UserRepository.verify_email(email)
            if(findEmail){
                return {status: 409, data: {msg: UserConstants.EMAIL_EXISTS}}
            }
            
            await UserRepository.create(name,email,password)
            return {status: 201, data: {msg: UserConstants.CREATED_SUCCESS}}
        }catch(e){
            return {status: 500, data: {msg: serverConstants.internalError}}
        }
    }

    // Need to fix here
    async update_user(req, res){
        try{
            // Validation
            const validation_errors = validationResult(req)
            if(!validation_errors.isEmpty()){
                return {status: 400, data: {msg: UserConstants.INVALID_DATA}}
            }
            
            let {name, email, password, role} = req.body
            let id = req.params.id

            let userFound = await UserRepository.find_one(id)
            if(userFound == undefined){
                return res.status(404).json({msg: userConstants.NOT_FOUND})
            }

            // Verify if e-mail already registered
            let findEmail = await UserRepository.verify_email(email)
            if(findEmail && email !== userFound.email){
                return {status: 409, data: {msg: UserConstants.EMAIL_EXISTS}}
            }

            await UserRepository.update(id, name, email, password, role)
            return {status: 200, data: {msg: UserConstants.UPDATED_SUCCESS}}
        }catch(e){
            return {status: 500, data: {msg: serverConstants.internalError}}
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