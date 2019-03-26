import React from 'react'
import {Link} from "react-router-dom"
import {Consumer} from "./DataProvider"


function BlsLink(button) {
    return (
        <Consumer>
            {value => (<Link className="link" onClick={() => {
                    value.getDataInfo(button)
                }} to={{
                    pathname: `/study/${button.series_id}`,
                    state:{button}
            }}>{button.title}</Link>)}
         </Consumer>
    )
}

export default BlsLink
