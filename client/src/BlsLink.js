import React from 'react'
import {withRouter} from "react-router-dom"



function BlsLink(props) {

    return (
         <button className="link" onClick={() => {
             props.history.push(`/study/${props.seriesid}`)
             }}>{props.title}</button>
    )
}

export default withRouter(BlsLink)
