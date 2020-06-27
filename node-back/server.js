const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()


const app = express()

//db
mongoose.connect(process.env.DATABASE_CLOUD, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB Connected'))
    .catch(err => console.log(err))

//import routes
const authRoutes = require('./routes/auth')

//app middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors({ origin: process.env.CLIENT_URL }))


//middlewares
app.use('/api', authRoutes);


const port = process.env.PORT
app.listen(port, () => console.log(`API is running on port ${port}`))