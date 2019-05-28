import React, { Component, createContext } from 'react'
import { withRouter } from 'react-router-dom'
import * as d3 from "d3"
import { createBarChart } from '../charts/chartFiles'
import { withDataProvider } from "./DataProvider"

export const { Consumer, Provider } = createContext()

class ChartProvider extends Component {
    //need helper functions to parse data & determine chart type
    constructor(props) {
        super(props);
        this.state = {

            seriesid: '',
            chartSettings: {
                time: 3,
                type: 'bar',
                width: 800,
                height: 600,
                margin: {
                    top: 40,
                    bottom: 80,
                    left: 60,
                    right: 60
                },
                color1: '#341C1C',
                color2: '#ADFCF9',
                scaleMod: .05
            },
            toolTip: {

                hover: {},
                hi: [],
                lo: [],
                avg: ''
            }
        }

    }

    componentDidMount = () => {
        this.setState(ps => ({
            chartSettings: {
                ...ps.chartSettings,
                node: this.node
            }
        }))
    }

    loadSeriesId = (path) => {
        this.setState({
            seriesid: path.split('/')[2]
        })
    }

    loadChartSize = (width, height) => {
        this.setState({
            width,
            height
        })
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
        console.log(time, seriesId)
        if (this.props.dataCheck(time, seriesId)) {
            const filteredData = await this.props.filterStateData(time)
            this.createChart(
                filteredData,
                this.props.study,
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
                this.state.chartSettings,
                {
                    dataMouseOver: this.dataMouseOver,
                    dataMouseOut: this.dataMouseOut
                })
        }
    }

    timeSeriesButtonClick = async (timeframe) => {
        d3.selectAll(`svg > *`).remove() //clear previous chart
        await this.props.history.push(`?time=${timeframe}`)
        await this.updateQueryParams()
        this.getDataRouter(timeframe)
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

    dataMouseOver = (data) => {
        this.setState(ps => ({
            toolTip: {
                ...ps.toolTip,
                hover: data
            }
        }))
    }

    dataMouseOut = (data) => {
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

    createChart = (data, metaData, chartSettings, functionsObj) => {
        createBarChart(data, metaData, chartSettings, functionsObj)
        this.updateToolTip(data)
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