import React from 'react'
import {Route, Switch} from "react-router-dom"
import Home from "./Home"
import About from "./About"
import {Consumer} from "./providers/DataProvider"
import Loading from "./Loading"
import ErrMsg from "./ErrMsg"
import Admin from './Admin'
import SignUp from './SignUp'
import LogIn from './LogIn'
import AdminRoute from './AdminRoute'
import DrawChart from './DrawChart'
import LinkGroup from './LinkGroup'

function MainView() {
    return (
            <div className="main">

            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <AdminRoute path="/admin" component={Admin} />
                <Route path='/signup' component={SignUp} />
                <Route path='/login' component={LogIn} />
                <Route path='/data' component={LinkGroup} />
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
