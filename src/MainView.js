import React from 'react'
import {Route} from "react-router-dom"
import Home from "./Home"
import About from "./About"
import {Consumer} from "./DataProvider"
import Chart from "./Chart"
import Loading from "./Loading"
import ErrMsg from "./ErrMsg"

function MainView() {
    return (
            <div className="main">

            
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
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
