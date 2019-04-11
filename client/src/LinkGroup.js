import React from 'react'

import BlsLink from "./BlsLink"
import sidebarData from "./data/sidebarData"
import {withDataProvider} from './DataProvider'

function LinkGroup(props) {
    console.log(props)
    const linkGroup = props.studies.map((study, i) => <BlsLink key={i} {...study} {...{getDataInfo:props.getDataInfo}}/>)
  
    return (
        <div className="data-group">
            <h3>Data Series</h3>
            <ul>
                {linkGroup}
            </ul>
        </div>
    )
}

export default withDataProvider(LinkGroup)
