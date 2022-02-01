const { body, param } = require("express-validator");

module.exports = {

    // Login routes
    login: [
        body("email").isString().isEmail(),
        body("password").isString().isLength({min: 8})
    ],

    // User routes
    id: [
        param("id").isString().custom(id => parseInt(id))
    ],

    // Create user form
    create_user: [
        body("name").isString(),
        body("email").isString().isEmail(),
        body("password").isString().isLength({min: 8})
    ],

    // Update user form
    update_user: [
        param("id").isString().custom(id => parseInt(id)),
        body("name").isString(),
        body("role").isInt(),
        body("email").isString().isEmail(),
        body("password").optional().isString().isLength({min: 8})
    ]

}