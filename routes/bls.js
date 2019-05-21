
const axios = require('axios')
const express = require('express')
const blsRouter = express.Router()
const Study = require('../models/study')

const cleanObjArr = (dataArr, dataArr2) => {
    console.log(dataArr, dataArr2)
    return [...dataArr, ...dataArr2].sort((a, b) => new Date(b.year, +b.period.substring(1), 1) - new Date(a.year, +a.period.substring(1), 1)).reduce((acc, cur, i, arr) => {
        if (i === 0) return [cur]
        if (new Date(cur.year, +cur.period.substring(1), 1) - new Date(arr[i-1].year, +arr[i-1].period.substring(1), 1) !== 0){
            return [...acc, cur]
        } else {
            //if one dataset no longer has prelim data, splice in
            if (arr[i-1].footnotes[0].code === 'P' && !cur.footnotes[0].code){
                acc.splice(i-1, 1, cur)
                return acc
            } else {
                return acc
            }
        }
    },[])
}

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
                    
                    const newStudyData = response.data.Results.series[0].data
                    // console.log(newStudyData)
                    //add date object to study data
                    // const updatedArr = newStudyData.map(el => el.date = new Date(el.year, +el.period.substring(1), 0))
                    console.log(newStudyData)
                    const studyUpdates = {
                        title,
                        subtitle,
                        yAxisName,
                        description,
                        seriesid   
                    }

                    Study.findOneAndUpdate({seriesid: seriesid}, studyUpdates)
                        .then(foundStudy => {
                            // console.log(foundStudy)
                            // const monsterArr = [...foundStudy.data, ...newStudyData]
                            const newArr = cleanObjArr(foundStudy.data, newStudyData)
                            console.log('newArr', newArr)
                            foundStudy.data = newArr
                            foundStudy.save()
                            .then(finalSave => {
                    
                                res.status(200).send(finalSave)
                            })
                            .catch(err => {
                                res.status(500);
                                next(err);
                            })
                        })
                        .catch(err => {
                            res.status(500)
                            next(err)
                        })
                })

        })


    module.exports = blsRouter