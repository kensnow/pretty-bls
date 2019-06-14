const express = require('express')
const User = require('../models/user')

const userRouter = express.Router()

userRouter.route('/')

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

    .put(async (req, res, next) => {
        try {
            // console.log(req.body)
            const chartId = req.body.chartId
            const userId = req.body.userId
            const chartSettings = req.body.chartSettings
            const action = req.body.action
            const foundUser = await User.findById(userId)
            if (action === 'add'){
                foundUser.favorites.push({chartId, chartSettings})
                const _ = await foundUser.save()
                res.status(200).send({chartId, chartSettings, alert:'favorite added!'})
            } else if (action === 'delete'){
                const arrIndex = foundUser.favorites.findIndex(fav => fav.chartId === chartId)
                foundUser.favorites.splice(arrIndex,1)
                const _ = await foundUser.save()
                res.status(200).send({alert:'favorite removed'})
            } else {
                throw new Error('something is up')
            }
            
        }
        catch(err){
            res.status(500)
            next(err)
        }
    })

module.exports = userRouter