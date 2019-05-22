import React from 'react'
import { render } from 'react-dom'

import App from "./App"
import {BrowserRouter} from "react-router-dom" 
import DataProvider from "./providers/DataProvider"
import ProfileProvider from './providers/ProfileProvider'
import ChartProvider from './providers/ChartProvider';

render(
    <DataProvider>
        <ProfileProvider>
            <BrowserRouter>
                <ChartProvider>
                
                    <App/>
                
                </ChartProvider>
            </BrowserRouter>
        </ProfileProvider>
    </DataProvider>,   
    document.getElementById("root"))