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

        //bind prototype functions
        this.getData = this.getData.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    //need to revert state upon each button click

    getData(seriesid, timeParam){
        let currentYear = (new Date()).getFullYear()
        let startYear = currentYear - timeParam
        return axios.get('/api/study/' + seriesid,seriesid)
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


    handleClick = (button, timeParam) => {

        ///make get data call with series ID, send state down to chart
        console.log("clicked")
        button.series_id ? this.getData(button.series_id, 3) : this.getData(button, timeParam)
        
    }

    componentDidMount(){
        this.getMetaData()
    }

    render() {       

        const chartContext = {
            getDataInfo: this.handleClick,
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
