import React, { Component, createContext } from 'react'
import axios from "axios"
import sidebarData from "./data/sidebarData"

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

    getData = (seriesid, timeParam) => {
        let currentYear = (new Date()).getFullYear()
        let startYear = currentYear - timeParam
        let formatedTimeParam = '?time=3'
        if (timeParam){
            formatedTimeParam = `?time=${timeParam}`
            console.log(formatedTimeParam)
        }

        return axios.get('/api/study/' + seriesid + formatedTimeParam,seriesid)
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
        
    }//end real get data
    
    //get component meta data

    getMetaData = () => {
        return axios.post('/api/study/', {option: 'meta'})
            .then(response => {
                console.log(response)
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


    getDataInfo = (seriesid, timeParam) => {

        ///make get data call with series ID, send state down to chart
        console.log("clicked")
        timeParam ? this.getData(seriesid, timeParam) : this.getData(seriesid, 3) 
        
    }

    componentDidMount(){
        this.getMetaData()
    }

    render() {       

        const chartContext = {
            getDataInfo: this.getDataInfo,
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
