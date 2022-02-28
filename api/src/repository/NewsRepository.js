const Slugify = require('slugify');
const database = require('../database/config')
const {v4: uuidv4} = require('uuid')

class NewsRepository{
    async find_all(page, limit){
        try{
            let news = await database.select(['news.*', 'user.name as user_name','category.name as category_name'])
            .from("news").orderBy('id', 'desc')
            .join('user', 'news.user_id', 'user.id')
            .join('category', 'news.category_id', 'category.id')
            .limit(limit)
            .offset((page - 1) * limit)
            return news;
        }
        catch(error){
            console.log(error)
            throw error
        }
    }
    
    async find_by_id(id){
        try{
            let news = await database.select(['news.*', 'user.name as user_name','category.name as category_name'])
            .from("news").where('news.id', id)
            .join("user", "news.user_id", "user.id")
            .join("category", "news.category_id", "category.id")
            return news[0]
        }catch(error){
            console.log(error)
            return undefined
        }
    }

    async find_by_slug(slug){
        try{
            let news = await await database.select(['news.*', 'user.name as user_name','category.name as category_name'])
            .from("news").where('news.slug', slug)
            .join("user", "news.user_id", "user.id")
            .join("category", "news.category_id", "category.id")
            return news[0]
        }catch(error){
            console.log(error)
            return undefined
        }
    }

    async verify_title(title){
        let slug = Slugify(title).toLowerCase()

        try{
            let news = await database.select().table("news").where({slug})
            if(news.length > 0) return true
            else return false
        }catch(error){
            console.log(error)
        }
    }

    async verify_title_by_id(id, title){
        let slug = Slugify(title).toLowerCase()

        try{
            let news = await database.select().table("news").where({slug}).whereNot({id})
            if(news.length > 0) return true
            else return false
        }catch(error){
            console.log(error)
        }
    }

    async verify_id(id){
        try{
            let news = await database.select().table("news").where({id})
            if(news.length > 0) return true
            else return false
        }catch(error){
            console.log(error)
            return false
        }
    }

    async create(title, user_id, category_id, body){
        let slug = Slugify(title).toLowerCase()

        try{
            await database.insert(
            {
                id: uuidv4(),
                title, 
                slug, 
                is_active: true,
                user_id, 
                category_id, 
                body
            })
            .table("news")

        }catch(error){
            console.log(error)
        }
    }

    async update(id, title, is_active, category_id, body){
        let slug = Slugify(title).toLowerCase()

        try{
            await database.update({title, slug, body, category_id, is_active, updated_at: new Date()}).table("news").where({id})
        }catch(error){
            console.log(error)
        }
    }

    async delete_by_id(id){
        try{
            await database.delete().table("news").where({id})
        } catch(error){
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

module.exports = new NewsRepository()