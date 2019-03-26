import React from 'react'

function Loading({Loading, children}) {
    return (
        Loading ? <h1 className="loading">Loading</h1> : children
    )
}

export default Loading
