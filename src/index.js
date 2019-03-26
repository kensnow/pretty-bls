import React from 'react'
import { render } from 'react-dom'

import App from "./App"
import {BrowserRouter} from "react-router-dom" 
import DataProvider from "./DataProvider"

render(
    <DataProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </DataProvider>    ,   
    document.getElementById("root"))