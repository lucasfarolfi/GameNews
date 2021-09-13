const News = require("../models/News")

class NewsController{
    async findAll(req, res){
        let news = await News.findAll()
        res.json(news)
    }
    
    async getById(req, res){
        let id = req.params.id

        if(id == undefined || id == ''){
            return res.status(401).json({msg: "Dados inválidos."})
        }

        let news = await News.getById(parseInt(id))
        if(news == undefined){
            return res.status(404).json({msg: "Notícia não encontrada"})
        }

        res.status(200).json(news)
    }
    
    async create(req, res){
        let {title, category, body} = req.body

        if((title == undefined || title == '') ||
        (category == undefined || category == '') || (body == undefined || body == '')){
            return res.status(401).json({msg: "Dados inválidos."})
        }

        let newsExists = await News.findByTitle(title)
        if(newsExists){
            return res.status(406).json({msg: "Esta notícia já existe."})
        }

        await News.create(title, category, body)
        res.json({status: "Notícia criada com sucesso."})
    }

    async delete(req, res){
        let id = req.params.id

        if(id == undefined || id == ''){
            return res.status(401).json({msg: "Dados inválidos."})
        }

        let newsExists = News.findById(parseInt(id))
        if(!newsExists){
            return res.status(404).json({msg: "Notícia não encontrada."})
        }

        await News.deleteById(parseInt(id))
        res.status(200).json({status: "Notícia deletada com sucesso."})
    }

    async update(req, res){
        let id = req.params.id
        let {title, category, body} = req.body

        if((id == undefined || id == '') || (title == undefined || title == '') ||
        (category == undefined || category == '') || (body == undefined || body == '')){
            return res.status(401).json({msg: "Dados inválidos."})
        }

        let newsExists = await News.findTitleById(id, title)
        if(newsExists){
            return res.status(406).json({msg: "Esta notícia já existe."})
        }

        let verifyId = await News.findById(parseInt(id))
        console.log(verifyId)
        if(!verifyId){
            return res.status(404).json({msg: "Notícia não encontrada."})
        }

        await News.update(parseInt(id), title, category, body)
        res.json({status: "Notícia atualizada com sucesso."})
    }
}

module.exports = new NewsController()