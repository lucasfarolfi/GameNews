const Category = require("../services/Category")
const verifyUserAuth = require("../utils/verifyUserAuthenticated")

class CategoryController{
    async findAll(req, res){
        let service = await Category.findAll()
        return res.status(service.code).json(service.response)
    }

    async findById(req, res){
        let {id} = req.params
        let service = await Category.findById(id)
        return res.status(service.code).json(service.response)
    }

    async findBySlug(req, res){
        let {slug} = req.params
        let service = await Category.findBySlug(slug)
        return res.status(service.code).json(service.response)
    }

    async create(req, res){
        let {name} = req.body
        let user_auth = verifyUserAuth(req.headers.authorization)
        let service = await Category.create(name, user_auth.id)
        return res.status(service.code).json(service.response)
    }

    async update(req, res){
        let {id} = req.params
        let {name} = req.body
        let service = await Category.update(parseInt(id), name)
        return res.status(service.code).json(service.response)
    }

    async delete(req, res){
        let {id} = req.params
        let service = await Category.delete(parseInt(id))
        return res.status(service.code).json(service.response)
    }
}
module.exports = new CategoryController()