const express = require('express')
const blsRouter = express.Router()
const Study = require('../models/study')
import axios from 'axios'


const apiAddress = 'https://api.bls.gov/publicAPI/v2/timeseries/data/'

const apiKey = process.env.BLS_API_KEY
