import React, { Component, createContext } from 'react'
import { withRouter } from 'react-router-dom'
import * as d3 from "d3"

import { withDataProvider } from "./DataProvider"

export const { Consumer, Provider } = createContext()

class ChartProvider extends Component {
    //need helper functions to parse data & determine chart type
    constructor(props) {
        super(props);
        this.state = {
            width: 800,
            height: 600,
            margin: {
                top: 40,
                bottom: 80,
                left: 60,
                right: 60
            },
            seriesid: this.props.location.pathname.split('/')[2] || '',
            chartSettings: {
                time: 3,
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
        if (this.props.dataCheck(time, seriesId)) {
            const filteredData = await this.props.filterStateData(time)
            this.createBarChart(filteredData, this.props.study, this.state.chartSettings)
        } else {
            await this.props.getData(this.state.seriesid, `?time=${time}`)
            await this.state.seriesid && this.createBarChart(this.props.study.data, this.props.study, this.state.chartSettings)
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

    updateNode = (node) => {
        this.node = node
    }
    createBarChart = (data, metaData, chartSettings) => {
        //establish chart globals
        const node = this.node
        const width = this.state.width
        const height = this.state.height
        const margin = this.state.margin
        const canvas = d3.select(node)
        //useful data info
        const minVal = d3.min(data, d => d.value)
        const maxVal = d3.max(data, d => d.value)

        const firstEl = data[0] //most recent element
        const lastEl = data[data.length - 1] //oldest element

        //useful functions
        const parseTime = d3.timeParse('%B, 0, %Y')
        const formatTime = d3.timeFormat('%b %Y')
        const t = d3.transition().duration(750)

        this.updateToolTip(data)

        //append new data group
        const g = canvas.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)

        //set up x and y scales
        const x = d3.scaleTime()
            .domain([parseTime(`${lastEl.periodName}, 0, ${lastEl.year}`), parseTime(`${firstEl.periodName}, 0, ${firstEl.year}`)])
            .range([0, width])

        const colors = d3.scaleLinear()
            .domain([minVal, maxVal])
            .range([chartSettings.color1, chartSettings.color2])

        const xBand = d3.scaleBand()
            .domain(data.map(d => parseTime(`${d.periodName}, 0, ${d.year}`)).reverse())
            .range([0, width])
            .paddingInner(.2)
            .paddingOuter(.2)

        //TODO make y scale dynamically based on data range
        const y = d3.scaleLinear()
            .domain([minVal - minVal * chartSettings.scaleMod, maxVal + maxVal * chartSettings.scaleMod])
            .range([height, 0])

        //set up axes
        const xAxisCall = d3.axisBottom(x)
            .ticks(10)

        const yAxisCall = d3.axisLeft(y)
            .ticks(10)


        const xAxisGroup = g.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${height})`)
            .call(xAxisCall)
            .selectAll('text')
            .attr('y', '10')
            .attr('x', '-5')
            .attr('font-size', '14px')
            .attr('text-anchor', 'middle')

        const yAxisGroup = g.append('g')
            .attr('class', 'y-axis')
            .call(yAxisCall)
            .selectAll('text')
            .attr('font-size', '14px')

        //render axis ticks
        xAxisGroup.transition(t)
        yAxisGroup.transition(t)

        //render axes labels
        //x-axis label 
        g.append('text')
            .attr('class', 'x-axis label')
            .attr('x', width / 2)
            .attr('y', height + 40)
            .attr('font-size', '20px')
            .attr('text-anchor', 'middle')
            .text(`${chartSettings.time} years`)

        g.append('text')
            .attr('class', 'y-axis label')
            .attr('x', -(height / 2))
            .attr('y', -25)
            .attr('font-size', '20px')
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-90)')
            .text(metaData.yAxisName)
        //render bars to chart
        const bars = g.selectAll('rect')
            .data(data, d => d._id)

        bars.enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('fill', d => colors(d.value))
            .attr('x', d => xBand(parseTime(`${d.periodName}, 0, ${d.year}`)))
            .attr('y', y(minVal - minVal * chartSettings.scaleMod))
            .attr('height', 0)
            .attr('width', xBand.bandwidth())
            .on('mouseover', d => this.setState(ps => ({ toolTip: { ...ps.toolTip, hover: d } })))
            .on('mouseout', d => this.setState(ps => ({ toolTip: { ...ps.toolTip, hover: {} } })))
            .transition(t)
            .attr('y', d => y(d.value))
            .attr('height', d => height - y(d.value))
    }


    render() {
        const providerVals = {
            updateQueryParams: this.updateQueryParams,
            getDataRouter: this.getDataRouter,
            timeSeriesButtonClick: this.timeSeriesButtonClick,
            updateToolTip: this.updateToolTip,
            updateNode: this.updateNode,
            loadSeriesId:this.loadSeriesId,
            loadChartSize:this.loadChartSize,
            ...this.state
        }

        return(
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