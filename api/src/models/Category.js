const { default: slugify } = require("slugify")
const database = require("../database/config")

class Category{
    async findAll(){
        try{
            return await database.select().table("category")
        }
        catch(error){
            console.log(error)
        }
    }

    async create(name){
        let slug = slugify(name).toLowerCase()
        try{
            return await database.insert({name, slug, created_at: new Date(), author:"Lucas"}).table("category")
        }
        catch(error){
            console.log(error)
        }
    }

    async findByName(name){
        try{
            let findCategory = await database.select().table("category").where({name})
            if(findCategory.length > 0) return true
            else return false
        }catch(error){
            console.log(error)
            return false
        }
    }
}
module.exports = new Category()