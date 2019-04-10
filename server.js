const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/study', require('./routes/study'))
app.use('/api/bls', require('./routes/bls'))


mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('connected to MANGODB')
})

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT)
})