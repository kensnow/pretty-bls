import React, { Component, createContext } from 'react'
import axios from "axios"
import sidebarData from "./data/sidebarData"


export const {Consumer, Provider} = createContext()


//set initial state
const initialState = {
    seriesID:"",
    data:[],
    loading: true,
    errMsg: null,
}

export default class DataProvider extends Component {
    constructor(){
        super();
        this.state = initialState

        //bind prototype functions
        this.resetState = this.resetState.bind(this)
        this.getData = this.getData.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    //need to revert state upon each button click
    resetState(){
        this.setState(initialState)
    }

    
    // getData(seriesID){

    //     return(
    //         this.setState({
    //             series: seriesID,
    //             data: data.Results.series[0].data,
    //             loading: false,
    //             errMsg: false
    //         })
    //     )
 
    // } //end fake get data

    getData(seriesID, timeParam){
        let currentYear = (new Date()).getFullYear()
        let startYear = currentYear - timeParam
        return axios({
            method:"post",
            url:"https://api.bls.gov/publicAPI/v2/timeseries/data/",
            data:{
                seriesid:[seriesID],
                endyear:currentYear-1, //  Need to -1 because data is not all 2019 yet, request fails if not correct
                catalog:false, 
                calculations:false, 
                annualaverage:false,
                registrationkey:"061d1f39d5ae46cdacdd66d4a26d23ea",
                startyear:startYear,
            }
    
        })
            .then( response => 
                this.setState({
                    series: seriesID,
                    data: response.data.Results.series[0].data,
                    loading: false,
                    errMsg: false,
                    title: sidebarData.find(chart => ( chart.series_id === seriesID)).title,
                    subtitle: sidebarData.find(chart => ( chart.series_id === seriesID)).subtitle,
                    description: sidebarData.find(chart => ( chart.series_id === seriesID)).description


                }))
            .catch( errMsg => 
                this.setState({
                   loading:false,
                   errMsg:"Cannot get data"     
            }))
    
        
    }//end real get data
    

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


    handleClick(button, timeParam){

        ///make get data call with series ID, send state down to chart
        console.log("clicked")
        button.series_id ? this.getData(button.series_id, 3) : this.getData(button, timeParam)
        
    }

    render() {       

        const chartContext = {
            getDataInfo: this.handleClick,
            description: this.state.description,
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

export const withChartContext = C => Cprops => (
    <Consumer>
        {value => <C {...value}{...Cprops} />}
    </Consumer>
)
