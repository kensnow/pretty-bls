const express = require('express')
const User = require('../models/user')

const userRouter = express.Router()

userRouter.route('/:id')

    .get(async (req, res, next) => {
        try{
            const id = req.params
            const foundUser = await User.findById(id)
            res.status(200).send(foundUser)
        }
        catch(err) {
            res.status(500)
            next(err)
        }
    })

module.exports = userRouter