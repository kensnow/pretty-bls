import React from 'react'

function ChartDetails({title,subtitle,description}) {

    return (
        <div className="details">
            <h3>{title}</h3>
            <h5>{subtitle}</h5>
            <p>{description}</p>
        </div>
    )
}

export default ChartDetails
