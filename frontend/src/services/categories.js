import api from './api'

export const getCategories = ()=>{
    return api()
    .get("/categorias")
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