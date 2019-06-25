import React from 'react'
import {withRouter} from 'react-router-dom'
import {withDataProvider} from './providers/DataProvider'
import {withChartProvider} from './providers/ChartProvider'
function LinkGroup(props) {

    const linkGroup = props.studies.map((study, i) => <button key={i} className='link button' onClick={async () => {
        await props.history.push(`/study/${study.seriesid}?time=3`)
        props.prepareChart()
        }}><span className="data-link-title">{study.title}</span> </button>)

    return (
        <div className="data-group">
            <h3>Data Series</h3>
            <ul>
                {linkGroup}
            </ul>
        </div>
    )
}

export default withRouter(withChartProvider(withDataProvider(LinkGroup)))
