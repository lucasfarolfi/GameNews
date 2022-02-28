const UserRepository = require("../repository/UserRepository")
const UserConstants = require("../constants/UserConstants")
const ServerConstants = require("../constants/ServerConstants")
const { validationResult } = require("express-validator")

class UserController{
    async get_all(req, res){
        try{
            if(!validationResult(req).isEmpty()){
                return res.status(400).json({msg: UserConstants.INVALID_QUERY})
            }

            let page = req.query.page || 1
            let limit = req.query.limit || await UserRepository.count_all() 

            let users = await UserRepository.find_all(page, limit)
            res.status(200).json({ page, limit, total: users.length, result: users})
        }catch(e){
            console.log(e)
            res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async get_by_id(req, res){
        try{
            let {id} = req.params
            
            const validation_errors = validationResult(req)
            if(!validation_errors.isEmpty()){
                return res.status(400).json({msg: UserConstants.INVALID_DATA})
            }

            let user = await UserRepository.find_one(id)
            if(user == undefined){
                return res.status(404).json({msg: UserConstants.NOT_FOUND})
            }

            res.status(200).json(user)
        }catch(e){
            console.log(e)
            res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async create(req, res){
        try{
            let {name, email,password} = req.body

            const validation_errors = validationResult(req)
            if(!validation_errors.isEmpty()){
                return res.status(400).json({msg: UserConstants.INVALID_DATA})
            }

            // Verify if Email almost exists
            let findEmail = await UserRepository.verify_email(email)
            if(findEmail){
                return res.status(406).json({msg: UserConstants.EMAIL_ALREADY_EXISTS})
            }

            await UserRepository.create(name,email,password)
            res.status(200).json({status: UserConstants.CREATED_SUCCESS})
        }catch(e){
            res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async update(req, res){
        try{
            let {id} = req.params
            let {name, email, password, role} = req.body

            const validation_errors = validationResult(req)
            if(!validation_errors.isEmpty()){
                return res.status(400).json({msg: UserConstants.INVALID_DATA})
            }

            let userExists = await UserRepository.verify_id(id)
            if(!userExists){
                return res.status(404).json({msg: UserConstants.NOT_FOUND})
            }

            await UserRepository.update(id, name, email, password, role)
            res.status(200).json({status: UserConstants.UPDATED_SUCCESS})
        }catch(e){
            res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async delete(req, res){
        try{
            let {id} = req.params

            const validation_errors = validationResult(req)
            if(!validation_errors.isEmpty()){
                return res.status(400).json({msg: UserConstants.INVALID_DATA})
            }

            let idExists = await UserRepository.verify_id(id)
            if(!idExists){
                return res.status(404).json({msg: UserConstants.NOT_FOUND})
            }

            await UserRepository.delete(id)
            res.status(200).json({status: UserConstants.DELETED_SUCCESS})
        }catch(e){
              res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }
}

module.exports = new UserController()