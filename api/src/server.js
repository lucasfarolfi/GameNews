//Imports
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

//Use
app.use(cors())
require('dotenv').config()
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())


//Routes
app.use("/", require('./routes'))

//Server connection
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server running on port ${port}!`))