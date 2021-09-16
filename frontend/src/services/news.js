import api from './api'

export const getNews = () =>{
    return api()
    .get("/noticias")
    .then(res=>{
        return res.data || {}
    })
    .catch(error => {
        throw error.response
    })
}

export const getNewsById = (id) =>{
    return api()
    .get("/noticias/id/"+id)
    .then(res=>{
        return res.data || {}
    })
    .catch(error => {
        throw error.response
    })
}

export const getNewsBySlug = (slug) =>{
    return api()
    .get("/noticias/slug/"+slug)
    .then(res=>{
        return res.data || {}
    })
    .catch(error => {
        throw error.response
    })
}

export const createNews = (title, category, body) =>{
    return api()
    .post("/noticias", {title, category, body})
    .then(res=>{
        return res.data || {}
    })
    .catch(error => {
        throw error.response
    })
}

export const updateNews = (id,title, category, body) =>{
    return api()
    .put("/noticias/"+id, {title, category, body})
    .then(res=>{
        return res.data || {}
    })
    .catch(error => {
        throw error.response
    })
}

export const deleteNews = (id) =>{
    return api()
    .delete("/noticias/"+id)
    .then(res=>{
        return res.data || {}
    })
    .catch(error => {
        throw error.response
    })
}