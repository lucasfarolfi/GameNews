const News = require("../models/News")
const newsConstants = require("../constants/newsConstants")
const serverConstants = require("../constants/serverConstants")
const verifyData = require("../utils/verifyData")

class NewsController{
    async findAll(req, res){
        try{
            let news = await News.findAll()
            res.json(news)
        }catch(e){
            res.status(500).json({msg: serverConstants.internalError})
        }
    }
    
    async findById(req, res){
        try{
            let id = req.params.id

            if(!verifyData.id(id)){
                return res.status(400).json({msg: serverConstants.invalidData})
            }
            id = parseInt(id)

            let news = await News.findById(id)
            if(news == undefined){
                return res.status(404).json({msg: newsConstants.notFound})
            }

            res.status(200).json(news)
        }catch(e){
             res.status(500).json({msg: serverConstants.internalError})
        }
    }
    
    async findBySlug(req, res){
        try{
            let slug = req.params.slug
        
            if(!verifyData.slug(slug)){
                return res.status(400).json({msg: serverConstants.invalidData})
            }

            let newsExists = await News.findBySlug(slug)
            if(newsExists == undefined){
                return res.status(404).json({msg: newsConstants.notFound})
            }

            res.status(200).json(newsExists)
        }catch(e){
            res.status(500).json({msg: serverConstants.internalError})
        }
    }

    async create(req, res){
        try{
            let {title, category, body} = req.body

            if(!verifyData.createNews(title, category, body)){
                return res.status(400).json({msg: serverConstants.invalidData})
            }

            let newsExists = await News.verifyTitle(title)
            if(newsExists){
                return res.status(406).json({msg: newsConstants.alreadyExists})
            }

            await News.create(title, category, body)
            res.json({status: newsConstants.createdSuccess})
        }catch(e){
            res.status(500).json({msg: serverConstants.internalError})
        }
    }

    async delete(req, res){
        try{
            let id = req.params.id

            if(id == undefined || id == ''){
                return res.status(400).json({msg: serverConstants.invalidData})
            }

            let newsExists = News.findById(parseInt(id))
            if(!newsExists){
                return res.status(404).json({msg: newsConstants.notFound})
            }

            await News.deleteById(parseInt(id))
            res.status(200).json({status: newsConstants.deletedSuccess})
        }catch(e){
            res.status(500).json({msg: serverConstants.internalError})
        }
    }

    async update(req, res){
        try{
            let id = req.params.id
            let {title, category, body} = req.body

            if(!verifyData.id(id) || !verifyData.createNews(title,category,body)){
                return res.status(400).json({msg: serverConstants.invalidData})
            }
            id = parseInt(id)

            let newsExists = await News.verifyTitleById(id, title)
            if(newsExists){
                return res.status(406).json({msg: newsConstants.alreadyExists})
            }

            let verifyId = await News.findById(id)
            console.log(verifyId)
            if(!verifyId){
                return res.status(404).json({msg: newsConstants.notFound})
            }

            await News.update(id, title, category, body)
            res.json({status: newsConstants.updatedSuccess})
        }catch(e){
            res.status(500).json({msg: serverConstants.internalError})
        }
    }
}

module.exports = new NewsController()