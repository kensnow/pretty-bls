import React, { Component, createContext } from 'react'
import axios from 'axios'

const { Consumer, Provider } = createContext()

const profileAxios = axios.create()
profileAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default class ProfileProvider extends Component {
    constructor() {
        super()
        this.state = {
            user: JSON.parse(localStorage.getItem('user')) || {favorites:[]},
            token: localStorage.getItem('token') || '',
            alert: '',
            showErr: false
        }
    }

    toggleFavorite = (id, chartSettings) => {
        this.findStudy(id) ? this.removeFavorite(id) : this.addFavorite(id, chartSettings)
    }

    findStudy = (id) => {
        const foundStudy = this.state.user.favorites.find(study => study.chartId === id)
        return foundStudy
    }

    addFavorite = async (id, chartSettings) => {
        try {
            const updateObject = {
                userId: this.state.user._id,
                chartId: id,
                action: 'add',
                chartSettings
            }
            const res = await profileAxios.put('/api/profile', updateObject)
            this.setState(ps => ({
                user: {
                    ...ps.user,
                    favorites: [...ps.user.favorites, res.data]
                },
                alert: res.data.alert,
                showErr: true
            }), () => {
                this.removeAlert()
            }
            )
        }
        catch (alert) {
            this.setState({ alert: alert })
        }
    }

    removeFavorite = async (id) => {
        try {
            const indexOfFavorite = this.state.user.favorites.findIndex(favStudy => favStudy.chartId === id)
            const updateObject = {
                userId: this.state.user._id,
                chartId: id,
                action: 'delete'
            }
            const res = await profileAxios.put('/api/profile', updateObject)
            const userFavs = this.state.user.favorites
            userFavs.splice(indexOfFavorite, 1)
            this.setState(ps => ({
                user: {
                    ...ps.user,
                    favorites: [...userFavs]
                },
                alert: res.data.alert,
                showErr: true
            }), () => {
                this.removeAlert()
            })
        }
        catch (alert) {
            this.setState({ alert: alert })
        }

    }

    removeAlert = () => {setTimeout(() => {
        this.setState({
            alert:'',
            showErr: false})
    }, 3000) 
    }

    logIn = (userDat) => {
        this.removeAlert()
        return profileAxios.post('/auth/login', { ...userDat })
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                this.setState({
                    user,
                    token,
                })
            })
            .catch(err => {
                this.setState({
                    alert: err.response.data.message
                })
            })
    }

    signUp = (userDat) => {
        this.removeAlert()
        return profileAxios.post('/auth/signup', { ...userDat })
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                this.setState({
                    user,
                    token,
                })
            })
            .catch(err => {
                this.setState({
                    alert: err.response.data.message
                })
                return err
            })
    }

    //add favorite function

    logOut = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        this.setState({
            user: {},
            token: ''
        })
    }

    render() {
        const value = {
            logIn: this.logIn,
            signUp: this.signUp,
            logOut: this.logOut,
            toggleFavorite: this.toggleFavorite,
            findStudy: this.findStudy,
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
        {value => <C {...value} {...props} />}
    </Consumer>
)