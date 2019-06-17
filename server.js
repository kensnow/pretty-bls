const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const expressJwt = require('express-jwt')
require('dotenv').config()

const app = express()
const path = require('path')

app.use(express.json())
app.use(morgan('dev'))
app.use('/api', expressJwt({secret: process.env.SECRET}))

app.use('/auth', require('./routes/auth'))
app.use('/api/profile', require('./routes/profile'))
app.use('/api/bls', require('./routes/bls'))
app.use('/study', require('./routes/study'))

app.use(express.static(path.join(__dirname, 'client', 'build')))

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError'){
        res.status(err.status)
    }
    return res.send({message: err.message})
})



mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('connected to MANGODB')
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT)
})