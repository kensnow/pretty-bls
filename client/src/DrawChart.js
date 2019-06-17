import React, { Component } from 'react'
import ChartDetails from './ChartDetails'
import { withDataProvider } from './providers/DataProvider'
import { withChartProvider } from './providers/ChartProvider'
import { withProfileProvider } from './providers/ProfileProvider'
import ChartHUD from './ChartHUD'
import ChartSettings from './ChartSettings'
import Favorites from './Favorites'

class DrawChart extends Component {

    componentDidMount = () => {
        this.props.prepareChart()
    }
    
    render() {
        const { title, subtitle, yScaleName, description, ...rest } = this.props.study

        // const seriesid = props.seriesid
        // console.log(this.props)

        return (
            <div className='chart-page-wrapper'>
                <div className="chart-wrapper">
                    <div className="chart" id="chart">
                        <h3>{title}</h3>
                        <h5>{subtitle}</h5>
                            {/* <h6 className="yAxis-title">{yScaleName}</h6> */}
                        <ChartHUD />
                        {this.props.token ? 
                            <div className='favorite-button-container'>
                                <button onClick={() => this.props.toggleFavorite(this.props.study._id, this.props.chartSettings)} className='favorite-button button' style={this.props.findStudy(this.props.study._id) ? {color:'gold'} : {color:'grey'}}>&#x2605;</button>
                                {<p className='favorite-alert alert' style={this.props.alert ? {opacity:1} : {opacity:0}}>{this.props.alert}</p>}
                            </div> :
                            null }
                        <svg ref={node => this.props.updateNode(node)} width={this.props.chartProps.width + this.props.chartProps.margin.left + this.props.chartProps.margin.right} height={this.props.chartProps.height + this.props.chartProps.margin.top + this.props.chartProps.margin.bottom}></svg>
                        
                    </div>
                </div>
                <div className='tool-collection'>
                    {this.props.token ? <Favorites /> : <div></div>}
                    <ChartSettings />
                </div>

                <ChartDetails title={title} subtitle={subtitle} description={description} />
            </div>

        )
    }
}

export default withProfileProvider(withDataProvider(withChartProvider(DrawChart)))


