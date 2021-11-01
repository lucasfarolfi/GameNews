const secret = require('./JWTSecret')
const jwt = require('jsonwebtoken')

module.exports = (bearer_token) =>{
    let token = bearer_token.split(' ')[1]
    let decoded =  jwt.verify(token, secret)
    return decoded.id
}