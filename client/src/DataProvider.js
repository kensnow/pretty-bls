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

    getData = (seriesid, timeParam = '?time=3') => {

        return axios.get('/api/study/' + seriesid + timeParam,seriesid)
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
