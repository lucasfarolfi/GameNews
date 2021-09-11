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
    .get("/categoria/"+id)
    .then(res=>{
        return res.data || {}
    })
    .catch(error=>{
        throw error.response
    })
}

export const createCategory = (name)=>{
    return api()
    .post("/categoria/", {name})
    .then(res=>{
        return res.data || {}
    })
    .catch(error=>{
        throw error.response
    })
}

export const updateCategory = (id,name)=>{
    return api()
    .put("/categoria/"+id, {name})
    .then(res=>{
        return res.data || {}
    })
    .catch(error=>{
        throw error.response
    })
}

export const deleteCategory = (id)=>{
    return api()
    .delete("/categoria/"+id)
    .then(res=>{
        return res.data || {}
    })
    .catch(error=>{
        throw error.response
    })
}