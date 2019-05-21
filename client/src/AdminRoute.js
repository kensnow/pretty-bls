import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {withProfileProvider} from './providers/ProfileProvider'

function AdminRoute(props) {
    const {component: Component, ...rest} = props
    console.log(props)
    return (
        props.token && props.user.isAdmin ? 
            <Route {...rest} component={Component}/>
            :
            <Redirect to='/login'/>
    )
}

export default withProfileProvider(AdminRoute)