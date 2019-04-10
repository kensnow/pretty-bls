const express = require('express')
const Study = require('../models/study')

const studyRouter = express.Router()

studyRouter.route('/')
    //general get request should return all study ids and names
    .get((req, res, next) => {
        Study.find()
            .then(studyCollection => res.status(200).send(studyCollection))
            .catch(err => {
                res.status(500)
                next(err)
            })
    })
    //post req should be adding whole new study series
    .post((req, res, next) => {
        const study = req.body
        const studyDoc = new Study(study)
        studyDoc.save()
            .then(savedStudy => res.status(201).send(savedStudy))
            .catch(err => {
                res.status(500)
                next(err)
            })
    })

studyRouter.route('/:id')
    .get((req, res, next) => {
        const id = req.params.id
        Study.find(id)
            .then(foundStudy => res.status(200).send(foundStudy))
            .catch(err => {
                res.status(500)
                next(err)
            })
    })
    .delete((req, res, next) => {
        const id = req.params.id
        Study.findByIdAndDelete(id)
            .then(() => res.status(204).send('delete successful'))
            .catch(err => {
                res.status(500)
                next(err)
            })
    })
    .put((req, res, next) => {
        const id = req.params.id
        const updates = req.body
        Study.findByIdAndUpdate(id, updates, {new:true})
            .then(updatedStudy => res.status(200).send(updatedStudy))
            .catch(err => {
                res.status(500)
                next(err)
            })
    })

    module.exports = studyRouter