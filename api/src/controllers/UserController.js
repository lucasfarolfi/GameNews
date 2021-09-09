const User = require("../models/User")

class UserController{
    async findAll(req, res){
        let users = await User.findAll()
        res.status(200).json(users)
    }

    async create(req, res){
        let {name, email,password} = req.body

        //Null input values
        if((name == undefined || name == '') || (email == undefined || email == '') || (password == undefined || password == '')){
            return res.status(400).json({msg: "Dados inválidos."})
        }
        //Small password
        if(password.length < 8){
            return res.status(400).json({msg: "A senha deve ter no mínimo 8 caracteres."})
        }

        //Email almost exists
        let findEmail = await User.findByEmail(email)
        if(findEmail){
            return res.status(406).json({msg: "E-mail já cadastrado."})
        }

        await User.create(name,email,password)
        res.status(200).json({status:"Usuário criado com sucesso"})
    }

    async updateUser(req, res){
        let id = req.params.id
        let {name, email, password, role} = req.body

        if((name == undefined || name == '') || (email == undefined || email == '')
        || (password == undefined || password == '') || (role == undefined || role == '')){
            return res.status(401).json({msg: "Dados inválidos."})
        }

        let userExists = await User.findById(parseInt(id))
        if(!userExists){
            return res.status(404).json({msg: "Usuário não encontrado."})
        }

        await User.update(parseInt(id), name, email, password, role)
        res.status(200).json({status: "Usuário atualizado com sucesso."})
    }

    async updatePassword(req, res){
        let {email, password} = req.body

        if((email == undefined || email == '') || (password == undefined || password == '')){
            return res.status(401).json({msg: "Dados inválidos."})
        }

        if(password.length < 8){
            return res.status(401).json({msg: "A senha deve ter no mínimo 8 caracteres."})
        }

        let userExists = await User.findByEmail(email)
        if(!userExists){
            return res.status(404).json({msg: "Usuário incorreto ou não existe."})
        }

        await User.updatePassword(email,password)
        res.status(200).json({status: "Senha atualizada com sucesso."})
    }

    async delete(req, res){
        let {id} = req.params

        console.log(id)

        if(id == undefined || id == ''){
            return res.status(401).json({msg: "Dados inválidos."})
        }

        let idExists = await User.findById(id)
        if(!idExists){
            return res.status(404).json({msg: "Usuário não encontrado."})
        }

        await User.delete(parseInt(id))
        res.status(200).json({status: "Usuário deletado com sucesso."})
    }

}
module.exports = new UserController()