const { body, param } = require("express-validator");

module.exports = {
    // General routes
    id: [
        param("id").isString().isNumeric().custom(id => parseInt(id))
    ],
    slug: [
        param("slug").isString()
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
        param("id").isString().isNumeric().custom(id => parseInt(id)),
        body("name").isString(),
        body("role").isInt(),
        body("email").isString().isEmail(),
        body("password").optional().isString().isLength({min: 8})
    ],

    // News
    create_news: [
        body("title").isString().isLength({max: 150}),
        body("category_id").isInt(),
        body("body").isString().isLength({min: 10})
    ],
    update_news: [
        param("id").isString().isNumeric().custom(id => parseInt(id)),
        body("title").isString().isLength({max: 150}),
        body("category_id").isInt(),
        body("body").isString().isLength({min: 10})
    ],

    //Category
    create_category: [
        body("name").isString().isLength({max: 40}),
        body("user_id").isInt()
    ],
    update_category: [
        param("id").isString().isNumeric().custom(id => parseInt(id)),
        body("name").isString().isLength({max: 40})
    ]
}