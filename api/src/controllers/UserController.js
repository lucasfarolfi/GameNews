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

            let search = req.query.search || ''
            let page = req.query.page || 1
            let limit = req.query.limit || undefined

            let query = await UserRepository.find_and_count_by_query(page, limit, search)
            
            limit = !limit ? query.count : limit

            return res.status(200).json({ page, limit, total: query.count, 
                total_pages: Math.ceil(query.count / limit), 
                total_current_page: query.result.length,
                result: query.result
            })
        }catch(e){
            return res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async get_by_id(req, res){
        try{
            let {id} = req.params
            
            if(!validationResult(req).isEmpty()){
                return res.status(400).json({msg: UserConstants.INVALID_DATA})
            }

            let user = await UserRepository.find_one(id)
            if(user == undefined){
                return res.status(404).json({msg: UserConstants.NOT_FOUND})
            }

            return res.status(200).json(user)
        }catch(e){
            return res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async create(req, res){
        try{
            let {name, email,password} = req.body

            if(!validationResult(req).isEmpty()){
                return res.status(400).json({msg: UserConstants.INVALID_DATA})
            }

            // Verify if Email almost exists
            let findEmail = await UserRepository.verify_email(email)
            if(findEmail){
                return res.status(406).json({msg: UserConstants.EMAIL_ALREADY_EXISTS})
            }

            await UserRepository.create(name,email,password)
            return res.status(200).json({status: UserConstants.CREATED_SUCCESS})
        }catch(e){
            return res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async update(req, res){
        try{
            let {id} = req.params
            let {name, email, password, role} = req.body

            if(!validationResult(req).isEmpty()){
                return res.status(400).json({msg: UserConstants.INVALID_DATA})
            }

            let userExists = await UserRepository.verify_id(id)
            if(!userExists){
                return res.status(404).json({msg: UserConstants.NOT_FOUND})
            }

            await UserRepository.update(id, name, email, password, role)
            return es.status(200).json({status: UserConstants.UPDATED_SUCCESS})
        }catch(e){
            return res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async delete(req, res){
        try{
            let {id} = req.params

            if(!validationResult(req).isEmpty()){
                return res.status(400).json({msg: UserConstants.INVALID_DATA})
            }

            let idExists = await UserRepository.verify_id(id)
            if(!idExists){
                return res.status(404).json({msg: UserConstants.NOT_FOUND})
            }

            await UserRepository.delete(id)
            return res.status(200).json({status: UserConstants.DELETED_SUCCESS})
        }catch(e){
            return res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }
}

module.exports = new UserController()