const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const expressJwt = require('express-jwt')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use('/api', expressJwt({secret: process.env.SECRET}))

app.use('/auth', require('./routes/auth'))
app.use('/api/profile', require('./routes/profile'))
app.use('/study', require('./routes/study'))
app.use('/api/bls', require('./routes/bls'))

app.use((err, req, res, next) => {
    console.error(err)
    if (err.name === 'UnauthorizedError'){
        res.status(err.status)
    }
    return res.send({message: err.message})
})

mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('connected to MANGODB')
})

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT)
})