const CategoryRepository = require("../repository/CategoryRepository")
const CategoryConstants = require("../constants/CategoryConstants")
const ServerConstants = require("../constants/ServerConstants")
const { validationResult } = require("express-validator")
const decoded_user = require("../utils/verifyUserAuthenticated")
const UserRepository = require("../repository/UserRepository")
const ERole = require("../utils/ERole")

class CategoryController{
    async get_all(req, res){
        try{
            if(!validationResult(req).isEmpty()){
                return res.status(400).json({msg: CategoryConstants.INVALID_QUERY})
            }

            let search = req.query.search || ''
            let page = req.query.page || 1
            let limit = req.query.limit || await CategoryRepository.count_all() 

            let categories = await CategoryRepository.find_all(search)

            const offset = ( page * limit ) - limit
            const maxoffset = ( offset + limit )
            const total_pages = Math.ceil( categories.length / limit )
            const result = req.query.limit ? categories.slice(offset, maxoffset) : categories

            return res.status(200).json({ 
                page, 
                limit, 
                total: categories.length, 
                total_pages,
                total_current_page: result.length,
                result
            })
        }catch(e){
            res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async get_by_id(req, res){
        try{
            let {id} = req.params

            if(!validationResult(req).isEmpty()){
                return res.status(400).json({msg: CategoryConstants.INVALID_DATA})
            }

            let category = await CategoryRepository.find_by_id(id)
            if(category == undefined){
                return res.status(404).json({msg: CategoryConstants.NOT_FOUND})
            }

            return res.status(200).json(category)
        }catch(e){
            return res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async find_by_slug(req, res){
        try{
            let {slug} = req.params

            if(!validationResult(req).isEmpty()){
                return res.status(400).json({msg: CategoryConstants.INVALID_DATA})
            }

            let category = await CategoryRepository.find_by_slug(slug)
            if(category == undefined){
                return res.status(404).json({msg: CategoryConstants.NOT_FOUND})
            }

            return res.status(200).json(category)
        }catch(e){
            return res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async create(req, res){
        try{
            const {name} = req.body;

            if(!validationResult(req).isEmpty()){
                return res.status(400).json({msg: CategoryConstants.INVALID_DATA})
            }
            
            const user_id = decoded_user(req.headers['authorization']).id;
            const verify_user = await UserRepository.verify_id(user_id);
            if(!verify_user){
                return res.status(403).json({msg: ServerConstants.NOT_AUTHORIZED})
            }

            let categoryExists = await CategoryRepository.verify_slug(name)
            if(categoryExists){
                return res.status(406).json({msg: CategoryConstants.ALREADY_EXISTS})
            }
            
            await CategoryRepository.create(name, user_id)
            return res.json({status: CategoryConstants.CREATED_SUCCESS})
        }catch(e){
            return res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async update(req, res){
        try{
            let {id} = req.params
            let {name} = req.body

            if(!validationResult(req).isEmpty()){
                return res.status(400).json({msg: CategoryConstants.INVALID_DATA})
            }

            let categoryFound = await CategoryRepository.find_by_id(id)
            if(!categoryFound){
                return res.status(404).json({msg: CategoryConstants.NOT_FOUND})
            }

            const user = decoded_user(req.headers['authorization']);
            if(user.role != ERole.ADMIN && categoryFound.user_id !== user.id){
                return res.status(403).json({msg: ServerConstants.NOT_AUTHORIZED})
            }

            let nameExists = await CategoryRepository.verify_slug(name)
            if(nameExists){
                return res.status(406).json({msg: CategoryConstants.ALREADY_EXISTS})
            }

            await CategoryRepository.update(id, name)
            return res.status(200).json({status: CategoryConstants.UPDATED_SUCCESS})
        }catch(e){
            return res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async delete(req, res){
        try{
            let {id} = req.params
        
            if(!validationResult(req).isEmpty()){
                return res.status(400).json({msg: CategoryConstants.INVALID_DATA})
            }

            let categoryFound = await CategoryRepository.find_by_id(id)
            if(!categoryFound){
                return res.status(404).json({msg: CategoryConstants.NOT_FOUND})
            }

            const user = decoded_user(req.headers['authorization']);
            if(user.role != ERole.ADMIN && categoryFound.user_id !== user.id){
                return res.status(403).json({msg: ServerConstants.NOT_AUTHORIZED})
            }
            
            let categoryExists = await CategoryRepository.verify_id(id)
            if(!categoryExists){
                return res.status(404).json({msg: CategoryConstants.NOT_FOUND})
            }

            await CategoryRepository.delete(id)
            return res.status(200).json({status: CategoryConstants.DELETED_SUCCESS})
        }catch(e){
            return res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }
}
module.exports = new CategoryController()