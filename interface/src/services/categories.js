import api from './api'

export const getCategories = (page=null, limit=null, search=null)=>{
    let query = {}
    if(page) query['page'] = page
    if(limit) query['limit'] = limit
    if(search) query['search'] = search

    return api()
    .get("/categorias", { params: {...query} })
    .then(res=>{
        return res.data || {}
    })
    .catch(error=>{
        throw error.response
    })
}

export const getCategoryById = (id)=>{
    return api()
    .get("/categorias/id/"+id)
    .then(res=>{
        return res.data || {}
    })
    .catch(error=>{
        throw error.response
    })
}

export const createCategory = (name)=>{
    return api()
    .post("/categorias", {name})
    .then(res=>{
        return res.data || {}
    })
    .catch(error=>{
        throw error.response
    })
}

export const updateCategory = (id,name)=>{
    return api()
    .put("/categorias/"+id, {name})
    .then(res=>{
        return res.data || {}
    })
    .catch(error=>{
        throw error.response
    })
}

export const deleteCategory = (id)=>{
    return api()
    .delete("/categorias/"+id)
    .then(res=>{
        return res.data || {}
    })
    .catch(error=>{
        throw error.response
    })
}