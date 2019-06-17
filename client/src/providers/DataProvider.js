import React, { Component, createContext } from 'react'
import axios from "axios"

export const {Consumer, Provider} = createContext()


const profileAxios = axios.create()
profileAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default class DataProvider extends Component {
    constructor(){
        super();
        this.state = {
            loading: true,
            errMsg: null,
            study:{},
            studies:[]
        }
    }

    //need to revert state upon each button click

    getData = (seriesid, timeParam = '?time=3') => {
        return axios.get('/study/' + seriesid + timeParam,seriesid)
            .then( response => {
                this.setState({
                    loading: false,
                    errMsg: false,
                    study: response.data,
                    
                })})
            .catch( errMsg => 
                this.setState({
                   loading:false,
                   errMsg:"Cannot get data"     
            }))
        
    }

    getNewData = (stateObj) => {
        console.log('clicked')
        return profileAxios.post('/api/bls',stateObj
        )
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    updateData = (seriesid, studyObj) => {
        return profileAxios.put('/api/bls/'+ seriesid, studyObj )
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    dataCheck = (time, seriesId) => {
        //this function checks if the time is less than the data range already stored in state, returns a true or false
        if (this.state.study.seriesid !== seriesId) {return false}
        const currentDate = new Date
        const currentYear = currentDate.getFullYear()
        const oldestDataYear = this.state.study.data ? this.state.study.data[this.state.study.data.length-1].year : currentYear
        return oldestDataYear < currentYear - +time

    }

    filterStateData = (time) => {
        //this function takes the time, and returns the requested data from state
        const currentDate = new Date
        const currentYear = currentDate.getFullYear()
        const beginYear = currentYear - +time
        console.log(currentYear, beginYear)

        return this.state.study.data.filter(dataObj => dataObj.year <= currentYear && dataObj.year >= beginYear)
    }

    getMetaData = () => {
        return axios.post('/study/', {option: 'meta'})
            .then(response => {
                
                this.setState({
                    studies: response.data
                })
            })
    }

    componentDidMount(){
        this.getMetaData()
    }

    render() {       

        const chartContext = {
            getData: this.getData,
            filterStateData: this.filterStateData,
            dataCheck: this.dataCheck,
            getNewData: this.getNewData,
            updateData: this.updateData,
            ...this.state
        }

        return (
            <Provider value={chartContext}>
                {this.props.children}
            </Provider>
        )
    }
}

export const withDataProvider = C => Cprops => (
    <Consumer>
        {value => <C {...value}{...Cprops} />}
    </Consumer>
)
