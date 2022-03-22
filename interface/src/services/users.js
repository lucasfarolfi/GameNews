import api from './api'

export const getUsers = (page=null, limit=null, search=null) =>{
    let query = {}
    if(page) query['page'] = page
    if(limit) query['limit'] = limit
    if(search) query['search'] = search

    return api()
    .get("/usuarios", { params: {...query} })
    .then(res=>{
        return res.data || {}
    })
    .catch(err=>{ console.log(err)
        throw err
    })
}

export const getUserById = (id) =>{
    return api()
    .get("/usuarios/"+id)
    .then(res=>{
        return res.data || {}
    })
    .catch(err=>{
        throw err
    })
}

export const registerUser = (name,email,password) =>{
    return api()
    .post("/usuarios", {name, email, password})
    .then(res=>{
        return res.data || {}
    })
    .catch(err=>{
        throw err.response
    })
}

export const deleteUser = (id) =>{
    return api()
    .delete("/usuarios/"+id)
    .then(res=>{
        return res.data || {}
    })
    .catch(err=>{
        throw err.response
    })
}

export const updateUser = (id, name,email,role,password) =>{
    return api()
    .put("/usuarios/"+id, {name, email,role, password})
    .then(res=>{
        return res.data || {}
    })
    .catch(err=>{
        throw err.response
    })
}

export const loginUser = (email,password) =>{
    return api()
    .post("/login", {email,password})
    .then(res=>{
        return res.data || {}
    })
    .catch(err=>{
        throw err.response
    })
}