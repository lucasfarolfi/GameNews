//Imports
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()

//Use
app.use(cors())
dotenv.config()
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/files', express.static('uploads'));

//Routes
app.use("/", require('./src/routes'))

//Server connection
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server running on port ${port}!`))