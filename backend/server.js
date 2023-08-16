const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const colors = require('colors')
const port = process.env.PORT || 5000

connectDB()
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/tareas', require('./routes/tareasRoutes'))
app.use(errorHandler)

app.listen(port, () => console.log(`Server Started on port ${port}`))