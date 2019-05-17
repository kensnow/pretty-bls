import React, { Component, createContext } from 'react'
import axios from "axios"
import sidebarData from "../data/sidebarData"

export const {Consumer, Provider} = createContext()

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
        console.log(timeParam)
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

    dataCheck = (query) => {
        //this function checks if the query is less than the data range already stored in state, returns a true or false
        const currentDate = new Date
        const currentYear = currentDate.getFullYear()
        const oldestDataYear = this.state.study.data ? this.state.study.data[this.state.study.data.length-1].year : currentYear
        console.log(oldestDataYear)
        const [_,queryNum] = query.split('=')
        console.log(oldestDataYear, currentYear, +queryNum)
        return oldestDataYear < currentYear - +queryNum

    }

    filterStateData = (query) => {
        //this function takes the query, and returns the requested data from state
        const currentDate = new Date
        const currentYear = currentDate.getFullYear()
        const [_,queryNum] = query.split('=')
        const beginYear = currentYear - queryNum
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

    getNewData = (stateObj) => {
        console.log(stateObj)
        return axios.post('/api/bls',stateObj
        )
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    updateData = (seriesid, studyObj) => {
        return axios.put('/api/bls/'+ seriesid, studyObj )
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount(){
        this.getMetaData()
    }

    render() {       

        const chartContext = {
            getData: this.getData,
            getNewData: this.getNewData,
            updateData: this.updateData,
            filterStateData: this.filterStateData,
            dataCheck: this.dataCheck,
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