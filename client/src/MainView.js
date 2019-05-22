import React from 'react'
import {Route, Switch} from "react-router-dom"
import Home from "./Home"
import About from "./About"
import {Consumer} from "./providers/DataProvider"
import Chart from "./Chart-old2"
import Loading from "./Loading"
import ErrMsg from "./ErrMsg"
import Admin from './Admin'
import SignUp from './SignUp'
import LogIn from './LogIn'
import AdminRoute from './AdminRoute'
import DrawChart from './DrawChart'

function MainView() {
    return (
            <div className="main">

            <Switch>
                <Route exact path="/" component={Home} />
                <AdminRoute path="/about" component={About} />
                <Route path="/admin" component={Admin} />
                <Route path='/signup' component={SignUp} />
                <Route path='/login' component={LogIn} />
                <Consumer>
                    {value => 
                        <Loading loading={value.loading}>
                            <ErrMsg errMsg={value.errMsg}>
                                <Route path="/study/:series_id" component={DrawChart} />
                            </ErrMsg>
                        </Loading>
                    }
                    
                </Consumer>
            </Switch>

            </div>
    )
}

export default MainView
