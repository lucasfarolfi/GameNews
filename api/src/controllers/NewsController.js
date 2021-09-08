const knex = require('../database/config')

class NewsController{
    
    findAll(req, res){
        res.send("Todas as notícias")
    }
    
    async create(req, res){

        /*
        await knex.insert({
            id: 1,
            title: "auhduaduaudauwd",
            slug: "a-a-d-3w-d2-ed-a",
            body: "ahusduh asdhu ahud huasd huashud ahusdhuas ",
            author: "joaozin",
            created_at: '2021-10-01'
        }).into('news')*/

        res.json({status: "Notícia criada"})
    }
}

module.exports = new NewsController()