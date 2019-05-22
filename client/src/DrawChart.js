import React, {Fragment} from 'react'
import { withDataProvider } from "./providers/DataProvider"
import ChartDetails from "./ChartDetails"
import {withChartProvider} from './providers/ChartProvider'

function DrawChart(props) {
    console.log(props)
    const { title, subtitle, yScaleName, description, ...rest} = props.study

    // const seriesid = props.seriesid

    const hiVals = props.toolTip.hi.map((el, i) => i === 0 ? 
        <Fragment key={i}> <p>value:</p><p>{el.value}</p><p>date:</p><p>{`${el.periodName.substring(0, 3)}, ${el.year}`}</p></Fragment> 
        : 
        <Fragment key={i}> <span></span><p>{`${el.periodName.substring(0, 3)}, ${el.year}`}</p></Fragment>)
    const loVals = props.toolTip.lo.map((el, i) => i === 0 ? 
        <Fragment key={i}> <p>value:</p><p>{el.value}</p><p>date:</p><p>{`${el.periodName.substring(0, 3)}, ${el.year}`}</p></Fragment> 
        :
        <Fragment key={i}> <p></p><p>{`${el.periodName.substring(0, 3)}, ${el.year}`}</p></Fragment>)
    return (
        <div className="chart-wrapper">
            <h3>{title}</h3>
            <h5>{subtitle}</h5>
            <div className="time-button-container">
                <button className="time-button 3-year" onClick={() => props.timeSeriesButtonClick('3')} >3 years</button>
                <button className="time-button 10-year" onClick={() => props.timeSeriesButtonClick('10')}>10 years</button>
                <button className="time-button 20-year" onClick={() => props.timeSeriesButtonClick('20')}>20 years</button>
                <button className="time-button all" onClick={() => props.timeSeriesButtonClick('all')}>all</button>
            </div>
            <div className="chart" id="chart">
                <h6 className="yAxis-title">{yScaleName}</h6>
                <svg ref={node => props.updateNode(node)} width={props.width + props.margin.left + props.margin.right} height={props.height + props.margin.top + props.margin.bottom}></svg>
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
                        <p>value:</p><p>{props.toolTip.avg}</p>
                    </div>
                    {props.toolTip.hover.value &&
                        <>
                            <h5>target</h5>
                            <div className="tool-tip">
                                <p>value:</p><p>{props.toolTip.hover.value}</p>
                                <p>date:</p><p>{`${props.toolTip.hover.periodName.substring(0, 3)}, ${props.toolTip.hover.year}`}</p>
                            </div>
                        </>
                    }
                </div>
            </div>

            <ChartDetails title={title} subtitle={subtitle} description={description} />
        </div>
    
    )
}

export default withDataProvider(withChartProvider(DrawChart))
