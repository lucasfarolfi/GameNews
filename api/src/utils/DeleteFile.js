const fs = require("fs")

module.exports = (filename) => {
    fs.unlink(`./uploads/${filename}`, (e) => console.log(e))
}