const Category = require("../services/Category")
const categoryConstants = require("../constants/categoryConstants")
const serverConstants = require("../constants/serverConstants")
const verifyData = require("../utils/verifyData")

class CategoryController{
    async findAll(req, res){
        let {user} = req.query
        let query = await Category.findAll(user)
        if(!query.code || query.msg){
            return res.status(query.code).json({msg: query.msg})
        }
        return res.status(query.code).json({categories: query.categories})
    }

    async findById(req, res){
        let {id} = req.params

        let query = await Category.findById(id)
        if(!query.code || query.msg){
            return res.status(query.code).json({msg: query.msg})
        }
        return res.status(query.code).json({categories: query.category})
    }

    async findBySlug(req, res){
        let {slug} = req.params

        let query = await Category.findBySlug(slug)
        if(!query.code || query.msg){
            return res.status(query.code).json({msg: query.msg})
        }
        return res.status(query.code).json({categories: query.category})
    }

    async create(req, res){
        let {name, user_id} = req.body

        let query = await Category.create(name, user_id)
        return res.status(query.code).json({msg: query.msg})
    }

    async update(req, res){
        let {id} = req.params
        let {name} = req.body

        let query = await Category.update(parseInt(id), name)
        return res.status(query.code).json({msg: query.msg})
    }

    async delete(req, res){
        let {id} = req.params

        let query = await await Category.delete(parseInt(id))
        return res.status(query.code).json({msg: query.msg})
    }
}
module.exports = new CategoryController()