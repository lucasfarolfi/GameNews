const NewsRepository = require("../repository/NewsRepository")
const NewsConstants = require("../constants/NewsConstants")
const ServerConstants = require("../constants/ServerConstants")
const { validationResult } = require("express-validator")
const decoded_user = require("../utils/verifyUserAuthenticated")
const UserRepository = require("../repository/UserRepository")
const ERole = require("../utils/ERole")

class NewsController{
    async get_all(req, res){
        try{
            if(!validationResult(req).isEmpty()){
                return res.status(400).json({msg: NewsConstants.INVALID_QUERY})
            }

            let page = req.query.page || 1
            let limit = req.query.limit || await NewsRepository.count_all() 

            let news = await NewsRepository.find_all(page, limit)
            return res.status(200).json({ page, limit, total: news.length, result: news})
        }catch(e){
            return res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }
    
    async get_by_id(req, res){
        try{
            let {id} = req.params
            
            if(!validationResult(req).isEmpty()){
                return res.status(400).json({msg: NewsConstants.INVALID_DATA})
            }
            
            let news = await NewsRepository.find_by_id(id)
            if(news == undefined){
                return res.status(404).json({msg: NewsConstants.NOT_FOUND})
            }

            return res.status(200).json(news)
        }catch(e){
            return res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }
    
    async find_by_slug(req, res){
        try{
            let {slug} = req.params
        
            if(!validationResult(req).isEmpty()){
                return res.status(400).json({msg: NewsConstants.INVALID_DATA})
            }

            let newsExists = await NewsRepository.find_by_slug(slug)
            if(newsExists == undefined){
                return res.status(404).json({msg: NewsConstants.NOT_FOUND})
            }

            return res.status(200).json(newsExists)
        }catch(e){
            return res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async create(req, res){
        try{
            let {title, category_id, body} = req.body

            if(!validationResult(req).isEmpty()){
                return res.status(400).json({msg: NewsConstants.INVALID_DATA})
            }
            
            const user_id = decoded_user(req.headers['authorization']).id;
            const verify_user = await UserRepository.verify_id(user_id);
            if(!verify_user){
                return res.status(403).json({msg: ServerConstants.NOT_AUTHORIZED})
            }

            let newsExists = await NewsRepository.verify_title(title)
            if(newsExists){
                return res.status(406).json({msg: NewsConstants.ALREADY_EXISTS})
            }

            await NewsRepository.create(title, user_id, category_id, body)
            return res.json({status: NewsConstants.CREATED_SUCCESS})
        }catch(e){
            return res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async delete(req, res){
        try{
            let {id} = req.params
            
            if(!validationResult(req).isEmpty()){
                return res.status(400).json({msg: NewsConstants.INVALID_DATA})
            }
            
            let newsExists = await NewsRepository.find_by_id(id)
            if(!newsExists){
                return res.status(404).json({msg: NewsConstants.NOT_FOUND})
            }

            const user = decoded_user(req.headers['authorization']);
            if(user.role != ERole.ADMIN && newsExists.user_id !== user.id){
                return res.status(403).json({msg: ServerConstants.NOT_AUTHORIZED})
            }

            await NewsRepository.delete_by_id(id)
            return res.status(200).json({status: NewsConstants.DELETED_SUCCESS})
        }catch(e){
            return res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }

    async update(req, res){
        try{
            let {id} = req.params
            let {title, is_active, category_id, body} = req.body

            if(!validationResult(req).isEmpty()){
                return res.status(400).json({msg: NewsConstants.INVALID_DATA})
            }
            
            let verifyId = await NewsRepository.find_by_id(id)
            if(!verifyId){
                return res.status(404).json({msg: NewsConstants.NOT_FOUND})
            }
            
            const user = decoded_user(req.headers['authorization']);
            if(user.role != ERole.ADMIN && verifyId.user_id !== user.id){
                return res.status(403).json({msg: ServerConstants.NOT_AUTHORIZED})
            }
            
            let newsExists = await NewsRepository.verify_title_by_id(id, title)
            if(newsExists){
                return res.status(406).json({msg: NewsConstants.ALREADY_EXISTS})
            }

            await NewsRepository.update(id, title, is_active, category_id, body)
            return res.json({status: NewsConstants.UPDATED_SUCCESS})
        }catch(e){
            return res.status(500).json({msg: ServerConstants.INTERNAL_ERROR})
        }
    }
}

module.exports = new NewsController()