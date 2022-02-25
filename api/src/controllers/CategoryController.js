const CategoryRepository = require("../repository/CategoryRepository")
const CategoryConstants = require("../constants/CategoryConstants")
const ServerConstants = require("../constants/ServerConstants")
const { validationResult } = require("express-validator")

class CategoryController{
    async get_all(req, res){
        try{
            let categories = await CategoryRepository.find_all()
            res.json(categories)
        }catch(e){
            res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async get_by_id(req, res){
        try{
            let {id} = req.params

            const validation_errors = validationResult(req)
            if(!validation_errors.isEmpty()){
                return res.status(400).json({msg: CategoryConstants.INVALID_DATA})
            }

            let category = await CategoryRepository.find_by_id(id)
            if(category == undefined){
                return res.status(404).json({msg: CategoryConstants.NOT_FOUND})
            }

            res.status(200).json(category)
        }catch(e){
            res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async find_by_slug(req, res){
        try{
            let {slug} = req.params

            const validation_errors = validationResult(req)
            if(!validation_errors.isEmpty()){
                return res.status(400).json({msg: CategoryConstants.INVALID_DATA})
            }

            let category = await CategoryRepository.find_by_slug(slug)
            if(category == undefined){
                return res.status(404).json({msg: CategoryConstants.NOT_FOUND})
            }

            res.status(200).json(category)
        }catch(e){
            res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async create(req, res){
        try{
            const {name} = req.body;

            const validation_errors = validationResult(req)
            if(!validation_errors.isEmpty()){
                return res.status(400).json({msg: CategoryConstants.INVALID_DATA})
            }

            let categoryExists = await CategoryRepository.verify_slug(name)
            if(categoryExists){
                return res.status(406).json({msg: CategoryConstants.ALREADY_EXISTS})
            }

            await CategoryRepository.create(name)
            res.json({status: CategoryConstants.CREATED_SUCCESS})
        }catch(e){
            res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async update(req, res){
        try{
            let {id} = req.params
            let {name} = req.body

            const validation_errors = validationResult(req)
            if(!validation_errors.isEmpty()){
                return res.status(400).json({msg: CategoryConstants.INVALID_DATA})
            }

            let categoryExists = await CategoryRepository.verify_id(id)
            if(!categoryExists){
                return res.status(404).json({msg: CategoryConstants.NOT_FOUND})
            }

            let nameExists = await CategoryRepository.verify_slug(name)
            if(nameExists){
                return res.status(406).json({msg: CategoryConstants.ALREADY_EXISTS})
            }

            await CategoryRepository.update(id, name)
            res.status(200).json({status: CategoryConstants.UPDATED_SUCCESS})
        }catch(e){
            res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async delete(req, res){
        try{
            let {id} = req.params
        
            const validation_errors = validationResult(req)
            if(!validation_errors.isEmpty()){
                return res.status(400).json({msg: CategoryConstants.INVALID_DATA})
            }

            let categoryExists = await CategoryRepository.verify_id(id)
            if(!categoryExists){
                return res.status(404).json({msg: CategoryConstants.NOT_FOUND})
            }

            await CategoryRepository.delete(id)
            res.status(200).json({status: CategoryConstants.DELETED_SUCCESS})
        }catch(e){
            res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }
}
module.exports = new CategoryController()