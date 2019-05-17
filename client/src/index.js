import React from 'react'
import { render } from 'react-dom'

import App from "./App"
import {BrowserRouter} from "react-router-dom" 
import DataProvider from "./providers/DataProvider"
import ProfileProvider from './providers/ProfileProvider'

render(
    <DataProvider>
        <ProfileProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ProfileProvider>
    </DataProvider>,   
    document.getElementById("root"))