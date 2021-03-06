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
    //post req should be adding whole new study series and responding to meta requests
    .post((req, res, next) => {
        if (req.body.option === 'meta'){
            console.log('getmeta!')
            Study.find()
                .then(foundStudies => {
                    const studyMetaDataArr = foundStudies.reduce((acc, cur) => {
                        const smd = {
                            title: cur.title,
                            subtitle:cur.subtitle,
                            yAxisName:cur.yAxisName,
                            description: cur.description,
                            seriesid:cur.seriesid,
                            _id:cur._id
                        }
                        return [...acc, smd] 
                    },[])
                    res.status(200).send(studyMetaDataArr)
                })
                .catch(err => {
                    err.status(500)
                    next(err)
                })
        } else {
            const study = req.body
            const studyDoc = new Study(study)
            studyDoc.save()
                .then(savedStudy => res.status(201).send(savedStudy))
                .catch(err => {
                    res.status(500)
                    next(err)
                })
        }

    })

studyRouter.route('/:id')
    .get((req, res, next) => {
        const id = req.params.id
        const params = req.query
        console.log(id, params)
        const currentDate = new Date()
        Study.findOne({seriesid: id})
            .then(foundStudy => {
                if (params.time === 'all'){
                    res.status(200).send(foundStudy)
                } else {
                    const trimmedStudyArr = foundStudy.data.filter(dataPoint => {
                        return dataPoint.year >= currentDate.getFullYear() - +params.time
                    })
                    foundStudy.data = trimmedStudyArr
                    res.status(200).send(foundStudy)
                }
            })
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