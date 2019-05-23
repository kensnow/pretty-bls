import React, { Fragment, Component } from 'react'
import { withDataProvider } from "./providers/DataProvider"
import ChartDetails from "./ChartDetails"
import { withChartProvider } from './providers/ChartProvider'

class DrawChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 800,
            height: 600
        }
    }


    componentDidMount = () => {

        this.props.updateQueryParams()
        this.props.loadSeriesId(this.props.location.pathname)
        this.props.loadChartSize(document.getElementById('chart').clientWidth - this.props.margin.left - this.props.margin.right, document.getElementById('chart').clientHeight - this.props.margin.top - this.props.margin.bottom)
        this.props.getDataRouter(this.props.chartSettings.time, this.props.seriesid)
    }


    render() {
        const { title, subtitle, yScaleName, description, ...rest } = this.props.study

        // const seriesid = props.seriesid

        const hiVals = this.props.toolTip.hi.map((el, i) => i === 0 ?
            <Fragment key={i}> <p>value:</p><p>{el.value}</p><p>date:</p><p>{`${el.periodName.substring(0, 3)}, ${el.year}`}</p></Fragment>
            :
            <Fragment key={i}> <span></span><p>{`${el.periodName.substring(0, 3)}, ${el.year}`}</p></Fragment>)
        const loVals = this.props.toolTip.lo.map((el, i) => i === 0 ?
            <Fragment key={i}> <p>value:</p><p>{el.value}</p><p>date:</p><p>{`${el.periodName.substring(0, 3)}, ${el.year}`}</p></Fragment>
            :
            <Fragment key={i}> <p></p><p>{`${el.periodName.substring(0, 3)}, ${el.year}`}</p></Fragment>)

        return (
            <div className="chart-wrapper">
                <h3>{title}</h3>
                <h5>{subtitle}</h5>
                <div className="time-button-container">
                    <button className="time-button 3-year" onClick={() => this.props.timeSeriesButtonClick('3')} >3 years</button>
                    <button className="time-button 10-year" onClick={() => this.props.timeSeriesButtonClick('10')}>10 years</button>
                    <button className="time-button 20-year" onClick={() => this.props.timeSeriesButtonClick('20')}>20 years</button>
                    <button className="time-button all" onClick={() => this.props.timeSeriesButtonClick('all')}>all</button>
                </div>
                <div className="chart" id="chart">
                    <h6 className="yAxis-title">{yScaleName}</h6>
                    <svg ref={node => this.props.updateNode(node)} width={this.props.width + this.props.margin.left + this.props.margin.right} height={this.props.height + this.props.margin.top + this.props.margin.bottom}></svg>
                    <div className='data-hud'>
                        <h5>period hi</h5>
                        <div className="tool-tip">
                            {hiVals}
                        </div>
                        <h5>period lo</h5>
                        <div className="tool-tip">
                            {loVals}
                        </div>
                        <h5>period mean</h5>
                        <div className="tool-tip">
                            <p>value:</p><p>{this.props.toolTip.avg}</p>
                        </div>
                        {this.props.toolTip.hover.value &&
                            <>
                                <h5>target</h5>
                                <div className="tool-tip">
                                    <p>value:</p><p>{this.props.toolTip.hover.value}</p>
                                    <p>date:</p><p>{`${this.props.toolTip.hover.periodName.substring(0, 3)}, ${this.props.toolTip.hover.year}`}</p>
                                </div>
                            </>
                        }
                    </div>
                </div>

                <ChartDetails title={title} subtitle={subtitle} description={description} />
            </div>

        )
    }
}

export default withDataProvider(withChartProvider(DrawChart))


