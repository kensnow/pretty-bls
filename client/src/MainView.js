import React from 'react'
import {Route} from "react-router-dom"
import Home from "./Home"
import About from "./About"
import {Consumer} from "./providers/DataProvider"
import Chart from "./Chart"
import Loading from "./Loading"
import ErrMsg from "./ErrMsg"
import Admin from './Admin'
import SignUp from './SignUp'
import LogIn from './LogIn'

function MainView() {
    return (
            <div className="main">

            
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/admin" component={Admin} />
                <Route path='/signup' component={SignUp} />
                <Route path='/login' component={LogIn} />
                <Consumer>
                    {value => 
                        <Loading loading={value.loading}>
                            <ErrMsg errMsg={value.errMsg}>
                                <Route path="/study/:series_id" component={Chart} />
                            </ErrMsg>
                        </Loading>
                    }
                    
                </Consumer>
            </div>
    )
}

export default MainView
