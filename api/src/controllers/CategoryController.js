const Category = require("../models/Category")
const categoryConstants = require("../constants/categoryConstants")
const serverConstants = require("../constants/serverConstants")
const verifyData = require("../utils/verifyData")

class CategoryController{
    async findAll(req, res){
        try{
            let categories = await Category.findAll()
            res.json(categories)
        }catch(e){
            res.status(500).json({msg: serverConstants.internalError})
        }
    }

    async findById(req, res){
        try{
            let {id} = req.params

            if(!verifyData.id(id)){
                return res.status(400).json({msg: serverConstants.invalidData})
            }
            id = parseInt(id)

            let category = await Category.findById(id)
            if(category == undefined){
                return res.status(404).json({msg: categoryConstants.notFound})
            }

            res.status(200).json(category)
        }catch(e){
            res.status(500).json({msg: serverConstants.internalError})
        }
    }

    async findBySlug(req, res){
        try{
            let {slug} = req.params

            if(!verifyData.slug(slug)){
                return res.status(400).json({msg: serverConstants.invalidData})
            }

            let category = await Category.findBySlug(slug)
            if(category == undefined){
                return res.status(404).json({msg: categoryConstants.notFound})
            }

            res.status(200).json(category)
        }catch(e){
            res.status(500).json({msg: serverConstants.internalError})
        }
    }

    async create(req, res){
        try{
            const {name} = req.body;

            if(!verifyData.name(name)){
                return res.status(400).json({msg: serverConstants.invalidData})
            }

            let categoryExists = await Category.verifySlug(name)
            if(categoryExists){
                return res.status(406).json({msg: categoryConstants.alreadyExists})
            }

            await Category.create(name)
            res.json({status: categoryConstants.createdSuccess})
        }catch(e){
            res.status(500).json({msg: serverConstants.internalError})
        }
    }

    async update(req, res){
        try{
            let id = req.params.id
            let name = req.body.name

            if(!verifyData.id(id) || !verifyData.name(name)){
                return res.status(400).json({msg: serverConstants.invalidData})
            }
            id = parseInt(id)

            let categoryExists = await Category.verifyId(id)
            if(!categoryExists){
                return res.status(404).json({msg: categoryConstants.notFound})
            }

            let nameExists = await Category.verifySlug(name)
            if(nameExists){
                return res.status(406).json({msg: categoryConstants.alreadyExists})
            }

            await Category.update(id, name)
            res.status(200).json({status: categoryConstants.updatedSuccess})
        }catch(e){
            res.status(500).json({msg: serverConstants.internalError})
        }
    }

    async delete(req, res){
        try{
            let id = req.params.id
        
            if(!verifyData.id(id)){
                return res.status(400).json({msg: serverConstants.invalidData})
            }
            id = parseInt(id)

            let categoryExists = await Category.verifyId(id)
            if(!categoryExists){
                return res.status(404).json({msg: categoryConstants.notFound})
            }

            await Category.delete(id)
            res.status(200).json({status: categoryConstants.deletedSuccess})
        }catch(e){
            res.status(500).json({msg: serverConstants.internalError})
        }
    }
}
module.exports = new CategoryController()