
const axios = require('axios')
const express = require('express')
const blsRouter = express.Router()
const Study = require('../models/study')



const apiAddress = 'https://api.bls.gov/publicAPI/v2/timeseries/data/'

const apiKey = process.env.BLS_API_KEY

blsRouter.route('/')
    .get((req, res, next) => {
        Study.find()
            .then(foundStudies => res.status(200).send(foundStudies))
            .catch(err => {
                res.status(500)
                next(err)})

    })
    .post((req, res, next) => {
        const {seriesid, endyear, startyear, title, subtitle, yAxisName, description} = req.body
        console.log(seriesid, endyear, startyear)
        axios({
            method: "post",
            url: apiAddress,
            data:{
                seriesid:[seriesid],
                endyear: endyear,
                startyear: startyear,
                catalog:false,
                calculations:false,
                registrationkey:apiKey
            }
        })
        .then(response => {
            
            const studyData = response.data.Results.series[0].data

            const studyObject = {
                title,
                subtitle,
                yAxisName,
                description,
                seriesid,
                data: [...studyData]
            }

            newStudy = new Study({...studyObject})
            newStudy.save()
                .then(savedStudy => res.status(200).send(savedStudy))
                .catch(err => {
                    res.status(500)
                    next(err)})

        })
        .catch(err => {
            console.log(err)
            res.status(500)
            next(err)
        })
        
        
    })

    blsRouter.route('/:id')
        .put((req, res, next) => {
            const seriesId = req.params.id
            const updates = res.body
            const {seriesid, endyear, startyear, title, subtitle, yAxisName, description} = req.body
            console.log(seriesid, endyear, startyear)
            axios({
                method: "post",
                url: apiAddress,
                data:{
                    seriesid:[seriesid],
                    endyear: endyear,
                    startyear: startyear,
                    catalog:false,
                    calculations:false,
                    registrationkey:apiKey
                }
            })
                .then(response => {

                    const studyData = response.data.Results.series[0].data

                    const studyObject = {
                        title,
                        subtitle,
                        yAxisName,
                        description,
                        seriesid,
                        data: [...studyData]
                    }

                    Study.findOne({seriesid: seriesid})
                    .then(foundStudy => console.log(foundStudy))
                    .catch(err => {
                        res.status(500)
                        next(err)
                    })
                })

        })


    module.exports = blsRouter