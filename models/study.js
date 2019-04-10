const mongoose = require('mongoose')

const studySchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    subtitle:String,
    yAxisName:String,
    description:String,
    seriesid:{
        type:String,
        required:true
    },
    data:[{
        year: Number,
        period: String,
        periodName:String,
        value: Number,
        footnotes:[]
    }]
})

module.exports = mongoose.model('Study', studySchema)