module.exports = {
    id(id){
        if(id == undefined || id == '' || isNaN(id)){
            return false
        }
        return true
    },

    slug(slug){
        if(slug == undefined || slug == ''){
            return false
        }
        return true
    },

    name(name){
        if(name == undefined || name == ''){
            return false
        }
        return true
    },

    createUser(name,email,password){
        if((name == undefined || name == '') || 
        (email == undefined || email == '') || 
        (password == undefined || password == '')){
            return false
        }
        return true
    },

    createNews(title, category, body){
        if((title == undefined || title == '') ||
        (category == undefined || category == '') || 
        (body == undefined || body == '')){
            return false
        }
        return true
    },

    minPassword(password){
        if(password.length < 8){
            return false
        }
        return true
    },

    updateUser(name,email,role){
        if((name == undefined || name == '') || 
        (email == undefined || email == '') || 
        (role == undefined || role == '')){
            return false
        }
        return true
    },

    email_Pass(email,password){
        if((email == undefined || email == '') || 
        (password == undefined || password == '')){
            return false
        }
        return true
    },
}