import React, {Fragment, useState} from 'react'
import {withChartProvider} from './providers/ChartProvider'


function ChartHUD(props) {

    const [toggleHi, setToggleHi] = useState(false)
    const [toggleLo, setToggleLo] = useState(false)
    const toggleHiState = () => {
        setToggleHi(!toggleHi)
    }

    const toggleLoState = () => {
        setToggleLo(!toggleLo)
    }

    const hiVals = props.toolTip.hi.map((el, i) => i === 0 ?
        <Fragment key={i}> value: {el.value} date: {`${el.periodName.substring(0, 3)} ${el.year}`}</Fragment>
        :
        <Fragment key={i}> {`${el.periodName.substring(0, 3)} ${el.year}`}</Fragment>)
    
    const loVals = props.toolTip.lo.map((el, i) => i === 0 ?
        <Fragment key={i}> value: {el.value} date: {`${el.periodName.substring(0, 3)} ${el.year}`}</Fragment>
        :
        <Fragment key={i}> {`${el.periodName.substring(0, 3)} ${el.year}`}</Fragment>)

    return (
        <div className='data-hud'>
            
            <div className="tool-tip">
                {toggleHi ? <><h5>hi: </h5>{hiVals}</> : props.toolTip.hi[0] ? <><h5>hi:</h5> {props.toolTip.hi[0].value}</> : null}
                <button className='button' onClick={() => toggleHiState()}>{toggleHi ? <>^</>:<>...</>}</button>
            </div>
            
            <div className="tool-tip">
                {toggleLo ? <><h5>lo: </h5>{loVals}</> : props.toolTip.lo[0] ? <><h5>lo:</h5> {props.toolTip.lo[0].value}</> : null}
                    <button className='button' onClick={() => toggleLoState()}>{toggleLo ? <>^</>:<>...</>}</button>
            </div>
            
            <div className="tool-tip">
                <h5>mean</h5>
                <p>value: {props.toolTip.avg}</p>
            </div>
            {props.toolTip.hover.value &&
                    
                    <div className="tool-tip">
                        <h5>target</h5>
                        <p>value: {props.toolTip.hover.value}</p>
                        <p>date: {`${props.toolTip.hover.periodName.substring(0, 3)}, ${props.toolTip.hover.year}`}</p>
                    </div>
            }
        </div>
    )
}

export default withChartProvider(ChartHUD)
