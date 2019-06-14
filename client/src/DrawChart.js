import React, { Fragment, Component } from 'react'
import ChartDetails from './ChartDetails'
import { withDataProvider } from './providers/DataProvider'
import { withChartProvider } from './providers/ChartProvider'
import { withProfileProvider } from './providers/ProfileProvider'

import ChartSettings from './ChartSettings'
class DrawChart extends Component {


    componentDidMount = () => {
        this.props.prepareChart()
    }
    
    render() {
        const { title, subtitle, yScaleName, description, ...rest } = this.props.study

        // const seriesid = props.seriesid
        // console.log(this.props)

        return (
            <div className="chart-wrapper">
                <div className="chart" id="chart">
                <h3>{title}</h3>
                <h5>{subtitle}</h5>
                    {/* <h6 className="yAxis-title">{yScaleName}</h6> */}
                    <div className='favorite-button-container'>
                        <button onClick={() => this.props.toggleFavorite(this.props.study._id, this.props.chartSettings)} className='favorite-button button' style={this.props.findStudy(this.props.study._id) ? {color:'gold'} : {color:'grey'}}>&#x2605;</button>
                        {<p className='alert' style={this.props.alert ? {opacity:1} : {opacity:0}}>{this.props.alert}</p>}
                    </div>
                    <svg ref={node => this.props.updateNode(node)} width={this.props.chartProps.width + this.props.chartProps.margin.left + this.props.chartProps.margin.right} height={this.props.chartProps.height + this.props.chartProps.margin.top + this.props.chartProps.margin.bottom}></svg>
                    
                </div>
                <ChartSettings />
                <ChartDetails title={title} subtitle={subtitle} description={description} />
            </div>

        )
    }
}

export default withProfileProvider(withDataProvider(withChartProvider(DrawChart)))


