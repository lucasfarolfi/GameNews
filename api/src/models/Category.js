const { default: slugify } = require("slugify")
const database = require("../database/config")

class Category{
    async findAll(){
        try{
            return await database.select().table("category").orderBy('id', 'desc')
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

    async update(id, name){
        let slug = slugify(name).toLowerCase()
        try{
            return await database.update({name, slug, updated_at: new Date(), author:"Lucas"}).table("category").where({id})
        }
        catch(error){
            console.log(error)
        }
    }

    async delete(id){
        try{
            await database.delete().table("category").where({id})
        }catch(error){
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

    async findBySlug(name){
        let slug = slugify(name).toLowerCase()
        try{
            let findCategory = await database.select().table("category").where({slug})
            if(findCategory.length > 0) return true
            else return false
        }catch(error){
            console.log(error)
            return false
        }
    }

    async findById(id){
        try{
            let findCategory = await database.select().table("category").where({id})
            if(findCategory.length > 0) return true
            else return false
        }catch(error){
            console.log(error)
            return false
        }
    }

    async getBySlug(slug){
        try{
            return await database.select().table("category").where({slug})[0]
        }catch(error){
            console.log(error)
        }
    }

    async getById(id){
        try{
            let category = await database.select().table("category").where({id})
            return category[0]
        }catch(error){
            console.log(error)
        }
    }
}
module.exports = new Category()