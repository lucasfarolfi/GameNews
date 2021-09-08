//Imports
const express = require('express')
const morgan = require('morgan')
const app = express()

//Use
require('dotenv').config()
app.use(morgan('dev'))

//Routes
app.use("/", require('./routes'))

//Server connection
const port = process.env.PORT
app.listen(port, () => console.log(`Server running on port ${port}!`))