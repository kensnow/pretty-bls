import React from 'react'
import {withRouter} from 'react-router-dom'
import BlsLink from "./BlsLink"
import sidebarData from "./data/sidebarData"
import {withDataProvider} from './providers/DataProvider'

function LinkGroup(props) {

    const linkGroup = props.studies.map((study, i) => <button key={i} className='link button' onClick={()=> {
        props.history.push(`/study/${study.seriesid}`)
        }}>{study.title} </button>)

    return (
        <div className="data-group">
            <h3>Data Series</h3>
            <ul>
                {linkGroup}
            </ul>
        </div>
    )
}

export default withRouter(withDataProvider(LinkGroup))
