import React from 'react'

function ErrMsg({errMsg,children}) {
    return (
        errMsg ? <div className="error">Problem Fetching Data</div> : children
    )
}

export default ErrMsg
