import React from 'react'
import {Link} from 'react-router-dom'
function Home() {
    return (
        <div className="center">
            <h2>pretty BLS</h2>
            <Link className='link' to='/data'>Find Charts</Link>
            <h5>important data should look pretty good.</h5>
        </div>
    )
}

export default Home
