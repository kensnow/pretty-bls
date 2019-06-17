import React from 'react'

import {withProfileProvider} from './providers/ProfileProvider'
import {withDataProvider} from './providers/DataProvider'
function Favorites(props) {

    const favorites = props.user.favorites.map((fav, i) => {
        const foundFav = props.studies.find(study => study._id === fav.chartId)
        return <li key={i}>{foundFav.title}</li>
    })
    console.log(props)
    return (
        <div className='chart-tool-container favorites-container'>
            <h3>Favorites: </h3>
            <ul className='favorites-list'>
                {favorites}
            </ul>
        </div>
    )
}

export default withDataProvider(withProfileProvider(Favorites))
