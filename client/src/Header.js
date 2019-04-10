import React from 'react'
import {Link} from "react-router-dom"


function Header() {
    return (
        <nav>
            <h1>pBLS</h1>
            <div className="linkbar">
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/about">About</Link>
                <a className="link" href="/#sidebar">Data</a>
            </div>
        </nav>
    )
}

export default Header
