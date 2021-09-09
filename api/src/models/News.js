const database = require('../database/config')

class News{
    async findAll(){
        try{
            let news = await database.select().table("news")
            console.log(news)
            return news;
        }
        catch(error){
            console.log(error)
        }
    }
    async findOneById(id){
        
    }
}

module.exports = new News()