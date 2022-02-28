const { body, param, query } = require("express-validator");

module.exports = {
    // General routes
    id: [
        param("id").isUUID()
    ],
    slug: [
        param("slug").isString()
    ],
    pagination: [
        query("page").optional().isString().isNumeric().customSanitizer(p => parseInt(p)),
        query("limit").optional().isString().isNumeric().customSanitizer(l => parseInt(l))
    ],

    // Login routes
    login: [
        body("email").isString().isEmail(),
        body("password").isString().isLength({min: 8})
    ],

    // User
    create_user: [
        body("name").isString(),
        body("email").isString().isEmail(),
        body("password").isString().isLength({min: 8})
    ],
    update_user: [
        param("id").isUUID(),
        body("name").isString(),
        body("role").isInt(),
        body("email").isString().isEmail(),
        body("password").optional().isString().isLength({min: 8})
    ],

    // News
    create_news: [
        body("title").isString().isLength({max: 150}),
        body("category_id").isUUID(),
        body("body").isString().isLength({min: 10})
    ],
    update_news: [
        param("id").isUUID(),
        body("title").isString().isLength({max: 150}),
        body("is_active").isBoolean(),
        body("category_id").isUUID(),
        body("body").isString().isLength({min: 10})
    ],

    //Category
    create_category: [
        body("name").isString().isLength({max: 40})
    ],
    update_category: [
        param("id").isUUID(),
        body("name").isString().isLength({max: 40})
    ]
}