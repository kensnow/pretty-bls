import React from 'react'

function ChartHUD() {
    
    const hiVals = this.props.toolTip.hi.map((el, i) => i === 0 ?
        <Fragment key={i}> <p>value:</p><p>{el.value}</p><p>date:</p><p>{`${el.periodName.substring(0, 3)}, ${el.year}`}</p></Fragment>
        :
        <Fragment key={i}> <span></span><p>{`${el.periodName.substring(0, 3)}, ${el.year}`}</p></Fragment>)
    const loVals = this.props.toolTip.lo.map((el, i) => i === 0 ?
        <Fragment key={i}> <p>value:</p><p>{el.value}</p><p>date:</p><p>{`${el.periodName.substring(0, 3)}, ${el.year}`}</p></Fragment>
        :
        <Fragment key={i}> <p></p><p>{`${el.periodName.substring(0, 3)}, ${el.year}`}</p></Fragment>)

    return (
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
    )
}

export default ChartHUD
