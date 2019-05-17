import React, { Component, createContext } from 'react'
import axios from 'axios'

const {Consumer, Provider} = createContext()

const profileAxios = axios.create()
profileAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default class ProfileProvider extends Component {
    constructor(){
        super()
        this.state = {
            user:JSON.parse(localStorage.getItem('user')) || {},
            email:'',
            password:'',
            token: localStorage.getItem('token') || '',
            errMsg:''
        }
    }

    logIn = (userDat) => {
        return profileAxios.post('/auth/login', {...userDat})   
            .then(res => {
                const {user, token} = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                this.setState({
                    user,
                    token,
                    password:'',
                    email:''
                })
            })     
    }

    

    signUp = (userDat) => {
        return profileAxios.post('/auth/signup', {...userDat})
            .then(res => {
                const {user, token} = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                this.setState({
                    user,
                    token,
                    password:'',
                    email:''
                })
            })
            .catch(err => {
                this.setState({
                    errMsg:err.response.data.message
                })
                console.log(err)
                return err
            })
    }

    logOut = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        this.setState({
            user: {},
            token:''
        })
    }

    render() {
        const value = {
            logIn: this.logIn,
            signUp: this.signUp,
            logOut: this.logOut,
            ...this.state
        }
        return (
            <Provider value={value}>
                {this.props.children} 
            </Provider>
        )
    }
}


export const withProfileProvider = C => props => (
    <Consumer>
        {value => <C {...value} {...props}/>}
    </Consumer>
)