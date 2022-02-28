const { default: slugify } = require("slugify")
const {v4: uuidv4} = require('uuid')
const database = require("../database/config")

class CategoryRepository{
    async find_all(page, limit){
        try{
            return await database.select(['category.*', 'user.name as user_name'])
            .table("category").orderBy('id', 'desc')
            .join('user', 'category.user_id', 'user.id')
            .limit(limit)
            .offset((page - 1) * limit)
        }
        catch(error){
            console.log(error)
        }
    }

    async find_by_id(id){
        try{
            let category = await database.select(['category.*', 'user.name as user_name'])
            .from("category").where('category.id', id)
            .join('user', 'category.user_id', 'user.id')
            return category[0]
        }catch(error){
            console.log(error)
            return undefined
        }
    }

    async find_by_slug(slug){
        try{
            let category = await database.select(['category.*', 'user.name as user_name'])
            .from("category").where('category.slug', slug)
            .join('user', 'category.user_id', 'user.id')
            return category[0]
        }catch(error){
            console.log(error)
            return undefined
        }
    }

    async verify_slug(name){
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

    async verify_id(id){
        try{
            let findCategory = await database.select().table("category").where({id})
            if(findCategory.length > 0) return true
            else return false
        }catch(error){
            console.log(error)
            return false
        }
    }

    async create(name, user_id){
        let slug = slugify(name).toLowerCase()
        try{
            return await database.insert({id: uuidv4(), name, slug, user_id}).table("category")
        }
        catch(error){
            console.log(error)
        }
    }

    async update(id, name){
        let slug = slugify(name).toLowerCase()
        try{
            return await database.update({name, slug}).table("category").where({id})
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

    async count_all(){
        try{
            let count =  await database.count().table("news")
            return parseInt(count[0].count)
        }
        catch(e){
            throw e
        }
    }

}
module.exports = new CategoryRepository()