import React from 'react'
import { Link } from "react-router-dom"
import { withProfileProvider } from './providers/ProfileProvider'

function Header(props) {
    return (
        <nav>
            <h1>pBLS</h1>
            <div className="linkbar">
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/about">About</Link>
                {props.token ?
                    <button onClick={() => props.logOut()}>Log Out</button>
                    :
                    <>
                    <Link className='link' to='/login'>Log In</Link>
                    <Link className='link' to='/signup'>Sign Up</Link>
                    </>
                    }
                
                <a className="link" href="/#sidebar">Data</a>
            </div>
        </nav>
    )
}

export default withProfileProvider(Header)
