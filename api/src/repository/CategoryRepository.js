const { default: slugify } = require("slugify")
const {v4: uuidv4} = require('uuid')
const database = require("../database/config")

class CategoryRepository{
    async find_and_count_by_query(page, limit_param, search){
        try{
            let count = await database.count().table("category")
                .join('user', 'category.user_id', 'user.id')
            .whereRaw(`LOWER(category.name) LIKE ?`, `%${search.toLowerCase()}%`)

            count = parseInt(count[0].count)

            let limit = limit_param ? limit_param : count

            let categories = await database.select(['category.*', 'user.name as user_name'])
                .table("category").orderBy('created_at', 'desc')
                .join('user', 'category.user_id', 'user.id')
                .limit(limit).offset((page - 1) * limit)
            .whereRaw(`LOWER(category.name) LIKE ?`, `%${search.toLowerCase()}%`)
        
            return {result: categories, count};
        }
        catch(e){
            console.log(error)
            throw e
        }
    }

    async find_by_id(id){
        try{
            let category = await database.select(['category.*', 'user.name as user_name'])
            .from("category").where('category.id', id)
            .join('user', 'category.user_id', 'user.id')
            return category[0]
        }catch(e){
            console.log(e)
            throw e
        }
    }

    async find_by_slug(slug){
        try{
            let category = await database.select(['category.*', 'user.name as user_name'])
            .from("category").where('category.slug', slug)
            .join('user', 'category.user_id', 'user.id')
            return category[0]
        }catch(e){
            console.log(e)
            throw e
        }
    }

    async verify_slug(name){
        let slug = slugify(name).toLowerCase()
        try{
            let findCategory = await database.select().table("category").where({slug})
            if(findCategory.length > 0) return true
            else return false
        }catch(e){
            console.log(e)
            throw e
        }
    }

    async verify_id(id){
        try{
            let findCategory = await database.select().table("category").where({id})
            if(findCategory.length > 0) return true
            else return false
        }catch(e){
            console.log(e)
            throw e
        }
    }

    async create(name, user_id){
        let slug = slugify(name).toLowerCase()
        try{
            return await database.insert({id: uuidv4(), name, slug, user_id}).table("category")
        }
        catch(e){
            console.log(e)
            throw e
        }
    }

    async update(id, name){
        let slug = slugify(name).toLowerCase()
        try{
            return await database.update({name, slug}).table("category").where({id})
        }
        catch(e){
            console.log(e)
            throw e
        }
    }

    async delete(id){
        try{
            await database.delete().table("category").where({id})
        }catch(e){
            console.log(e)
            throw e
        }
    }

    async count_all(){
        try{
            let count =  await database.count().table("category")
            return parseInt(count[0].count)
        }
        catch(e){
            console.log(e)
            throw e
        }
    }

}
module.exports = new CategoryRepository()