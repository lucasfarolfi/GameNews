//Imports
const express = require('express')
const morgan = require('morgan')
const app = express()

//Use
require('dotenv').config()
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Routes
app.use("/", require('./routes'))

//Server connection
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server running on port ${port}!`))