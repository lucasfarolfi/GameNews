const NewsRepository = require("../repository/NewsRepository")
const NewsConstants = require("../constants/NewsConstants")
const ServerConstants = require("../constants/ServerConstants")
const { validationResult } = require("express-validator")

class NewsController{
    async get_all(req, res){
        try{
            let news = await NewsRepository.find_all()
            res.json(news)
        }catch(e){
            res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }
    
    async get_by_id(req, res){
        try{
            let {id} = req.params
            
            const validation_errors = validationResult(req)
            if(!validation_errors.isEmpty()){
                return res.status(400).json({msg: NewsConstants.INVALID_DATA})
            }
            
            let news = await NewsRepository.find_by_id(id)
            if(news == undefined){
                return res.status(404).json({msg: NewsConstants.NOT_FOUND})
            }

            res.status(200).json(news)
        }catch(e){
             res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }
    
    async find_by_slug(req, res){
        try{
            let {slug} = req.params
        
            const validation_errors = validationResult(req)
            if(!validation_errors.isEmpty()){
                return res.status(400).json({msg: NewsConstants.INVALID_DATA})
            }

            let newsExists = await NewsRepository.find_by_slug(slug)
            if(newsExists == undefined){
                return res.status(404).json({msg: NewsConstants.NOT_FOUND})
            }

            res.status(200).json(newsExists)
        }catch(e){
            res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async create(req, res){
        try{
            let {title, category_id, body} = req.body

            const validation_errors = validationResult(req)
            if(!validation_errors.isEmpty()){
                return res.status(400).json({msg: NewsConstants.INVALID_DATA})
            }

            let newsExists = await NewsRepository.verify_title(title)
            if(newsExists){
                return res.status(406).json({msg: NewsConstants.ALREADY_EXISTS})
            }

            await NewsRepository.create(title, category_id, body)
            res.json({status: NewsConstants.CREATED_SUCCESS})
        }catch(e){
            res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async delete(req, res){
        try{
            let {id} = req.params
            
            const validation_errors = validationResult(req)
            if(!validation_errors.isEmpty()){
                return res.status(400).json({msg: NewsConstants.INVALID_DATA})
            }
            
            let newsExists = await NewsRepository.find_by_id(id)
            if(!newsExists){
                return res.status(404).json({msg: NewsConstants.NOT_FOUND})
            }

            await NewsRepository.delete_by_id(id)
            res.status(200).json({status: NewsConstants.DELETED_SUCCESS})
        }catch(e){
            res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async update(req, res){
        try{
            let {id} = req.params
            let {title, category_id, body} = req.body

            const validation_errors = validationResult(req)
            if(!validation_errors.isEmpty()){
                return res.status(400).json({msg: NewsConstants.INVALID_DATA})
            }

            let newsExists = await NewsRepository.verify_title_by_id(id, title)
            if(newsExists){
                return res.status(406).json({msg: NewsConstants.ALREADY_EXISTS})
            }

            let verifyId = await NewsRepository.find_by_id(id)
            
            if(!verifyId){
                return res.status(404).json({msg: NewsConstants.NOT_FOUND})
            }

            await NewsRepository.update(id, title, category_id, body)
            res.json({status: NewsConstants.UPDATED_SUCCESS})
        }catch(e){
            res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }
}

module.exports = new NewsController()