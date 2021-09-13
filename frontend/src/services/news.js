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
    .get("/admin/noticia/"+id)
    .then(res=>{
        return res.data || {}
    })
    .catch(error => {
        throw error.response
    })
}

export const getNewsBySlug = (slug) =>{
    return api()
    .get("/noticia/"+slug)
    .then(res=>{
        return res.data || {}
    })
    .catch(error => {
        throw error.response
    })
}

export const createNews = (title, category, body) =>{
    return api()
    .post("/noticia", {title, category, body})
    .then(res=>{
        return res.data || {}
    })
    .catch(error => {
        throw error.response
    })
}

export const updateNews = (id,title, category, body) =>{
    return api()
    .patch("/noticia/"+id, {title, category, body})
    .then(res=>{
        return res.data || {}
    })
    .catch(error => {
        throw error.response
    })
}

export const deleteNews = (id) =>{
    return api()
    .delete("/noticia/"+id)
    .then(res=>{
        return res.data || {}
    })
    .catch(error => {
        throw error.response
    })
}