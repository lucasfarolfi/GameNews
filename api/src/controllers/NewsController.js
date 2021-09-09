const News = require("../models/News")
const knex  =require("../database/config")
class NewsController{
    
    async findAll(req, res){
        let news = await knex.select().table("news")
        console.log(news)
        res.send("Todas as notícias")
    }
    
    async create(req, res){

        /*
        await knex.insert({
            id: 2,
            title: "awdwd",
            slug: "a-a-dwdaa",
            body: "ahusduh asdhu ahud huasd huashud ahusdhuas ",
            author: "joaozin",
            created_at: '2021-10-01'
        }).into('news')*/

        res.json({status: "Notícia criada"})
    }
}

module.exports = new NewsController()