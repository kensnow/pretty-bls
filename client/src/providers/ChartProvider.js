import React, { Component, createContext } from 'react'
import { withRouter } from 'react-router-dom'
import * as d3 from "d3"
import { createBarChart, createLineChart } from '../charts/chartFiles'
import { withDataProvider } from "./DataProvider"

export const { Consumer, Provider } = createContext()

class ChartProvider extends Component {
    //need helper functions to parse data & determine chart type
    constructor(props) {
        super(props);
        this.state = {

            seriesid: '',
            chartProps:{
                width: 800,
                height: 600,
                margin: {
                    top: 40,
                    bottom: 80,
                    left: 60,
                    right: 60
                },
            },
            chartSettings: {
                time: 3,
                type: 'bar',
                color1: '#341C1C',
                color2: '#ADFCF9',
                scaleMod: 0,
                scale: 'linear',
                scaleLog:2,
                
            },
            toolTip: {

                hover: {},
                hi: [],
                lo: [],
                avg: ''
            }, 
           
        }

    }

    mountNode = () => (
        this.setState(ps => ({
            chartProps: {
                ...ps.chartProps,
                node: this.node
            }
        }))
    )

    loadSeriesId = (path) => {
        this.setState({
            seriesid: path.split('/')[2]
        })
    }

    loadChartSize = (width, height) => {
        this.setState(ps => ({
            chartProps: {
                ...ps.chartProps,
                width: width,
                height: height
            }
        }))
    }

    updateQueryParams = async () => {
        const queryParams = await this.props.location.search.substring(1).split('&').reduce((acc, cur) => {
            const [key, val] = cur.split('=')
            return { ...acc, [key]: val }
        }, {})
        this.setState(ps => ({
            
            chartSettings: {
                ...ps.chartSettings,
                ...queryParams
            }
        }))
    }

    getDataRouter = async (time, seriesId) => {
        
        if (this.props.dataCheck(time, seriesId)) {
            const filteredData = await this.props.filterStateData(time)
            this.createChart(
                filteredData,
                this.props.study,
                this.state.chartProps,
                this.state.chartSettings,
                {
                    dataMouseOver: this.dataMouseOver,
                    dataMouseOut: this.dataMouseOut
                })
        } else {
            
            await this.props.getData(this.state.seriesid, `?time=${time}`)
            await this.state.seriesid && this.createChart(
                this.props.study.data, 
                this.props.study, 
                this.state.chartProps,
                this.state.chartSettings,
                {
                    dataMouseOver: this.dataMouseOver,
                    dataMouseOut: this.dataMouseOut
                })
        }
    }

    timeSeriesButtonClick = async (timeframe, seriesid) => {
        d3.selectAll(`svg > *`).remove() //clear previous chart
        await this.props.history.push(`?time=${timeframe}`)
        await this.updateQueryParams()
        this.getDataRouter(timeframe,seriesid)
    }

    updateToolTip = (data) => {
        this.setState(ps => ({
            toolTip: {
                hover: ps.toolTip.hover,
                hi: data.filter(datObj => datObj.value === d3.max(data, d => d.value)),
                lo: data.filter(datObj => datObj.value === d3.min(data, d => d.value)),
                avg: Math.round(d3.mean(data, d => d.value) * 100) / 100
            }
        }))

    }

    updateChartSettings = (settings) => {
        this.setState( ps => ({
            chartSettings: {
                ...ps.chartSettings,
                ...settings
            }
        }), () => {
            d3.selectAll(`svg > *`).remove() //clear previous chart
            this.getDataRouter(this.state.chartSettings.time, this.state.seriesid)
        })
    }

    dataMouseOver = (data) => {
        this.setState(ps => ({
            toolTip: {
                ...ps.toolTip,
                hover: data
            }
        }))
    }

    dataMouseOut = () => {
        this.setState(ps => ({
            toolTip: {
                ...ps.toolTip,
                hover: {}
            }
        }))
    }

    updateNode = (node) => {
        this.node = node
        
    }

    createChart = (data, metaData, chartProps, chartSettings, functionsObj) => {
        chartSettings.type === 'bar' ?
            createBarChart(data, metaData, chartProps, chartSettings, functionsObj) :
            createLineChart(data, metaData, chartProps, chartSettings, functionsObj)
        this.updateToolTip(data)
    }

    prepareChart =  async () => {
        d3.selectAll(`svg > *`).remove() //clear previous chart
        await this.updateQueryParams()
        await this.mountNode()
        await this.loadSeriesId(this.props.location.pathname)
        await this.loadChartSize(document.getElementById('chart').clientWidth - this.state.chartProps.margin.left - this.state.chartProps.margin.right, document.getElementById('chart').clientHeight - this.state.chartProps.margin.top - this.state.chartProps.margin.bottom)
        this.getDataRouter(this.state.chartSettings.time, this.state.seriesid)
    }

    render() {
        const providerVals = {
            updateQueryParams: this.updateQueryParams,
            getDataRouter: this.getDataRouter,
            timeSeriesButtonClick: this.timeSeriesButtonClick,
            updateToolTip: this.updateToolTip,
            updateNode: this.updateNode,
            loadSeriesId: this.loadSeriesId,
            loadChartSize: this.loadChartSize,
            updateChartSettings: this.updateChartSettings,
            mountNode:this.mountNode,
            studyButtonClick: this.studyButtonClick,
            prepareChart: this.prepareChart,
            ...this.state
        }

        return (
            <Provider value={providerVals}>
                {this.props.children}
            </Provider>
        )
    }

}

export const withChartProvider = C => Cprops => (
    <Consumer>
        {value => <C {...value}{...Cprops} />}
    </Consumer>
)


export default withRouter(withDataProvider(ChartProvider))