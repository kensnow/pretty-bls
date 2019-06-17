import React from 'react'
import {Link} from 'react-router-dom'
function Home() {
    return (
        <div className="center">
            <h3>important data should look pretty good.</h3>
            <h5>pretty BLS</h5>
            <Link className='link' to='/data'>Find Charts</Link>
        </div>
    )
}

export default Home
