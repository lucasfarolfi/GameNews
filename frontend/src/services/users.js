import api from './api'

export const getUsers = () =>{
    return api()
    .get("/usuarios")
    .then(res=>{
        return res.data || {}
    })
    .catch(err=>{
        throw err
    })
}

export const getUserById = (id) =>{
    return api()
    .get("/usuario/"+id)
    .then(res=>{
        return res.data || {}
    })
    .catch(err=>{
        throw err
    })
}

export const deleteUser = (id) =>{
    return api()
    .delete("/usuario/"+id)
    .then(res=>{
        return res.data || {}
    })
    .catch(err=>{
        throw err
    })
}