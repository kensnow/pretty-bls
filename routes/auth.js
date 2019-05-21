const express = require('express')
const User = require('../models/user')
const authRouter = express.Router()
const jwt = require('jsonwebtoken')


authRouter.post('/signup', (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (err) {
            res.status(500)
            return next(err)
        } else if (existingUser !== null) {
            res.status(400)
            return next(new Error('That Email already exists!  Sign in instead'))
        } else {
            const newUser = new User(req.body)
            newUser.save((err, user) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                const token = jwt.sign(user.withoutElement('password', 'isAdmin'), process.env.SECRET)
                return res.status(201).send({ success: true, user: user.withoutElement('password', 'isAdmin'), token })
            })
        }
    })
})

authRouter.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email.toLowerCase() }, (err, user) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            res.status(403)
            return next(new Error('Email or Password are incorrect'))
        }
        user.checkPassword(req.body.password, (err, match) => {
            
            if (err) return res.status(500).send(err)
            if (!match) return res.status(401).send({ success: false, message: 'Email or password are incorrect' })
            user = user.withoutElement('password', (user.isAdmin ? null : 'isAdmin'))
            const token = jwt.sign(user, process.env.SECRET)
            return res.status(200).send({ token, user: user, success: true })
        })
    })
})


module.exports = authRouter