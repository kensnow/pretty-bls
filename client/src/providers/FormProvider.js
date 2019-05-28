import React, { Component } from 'react'

export default class FormHandler extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputs: props.inputs,
            errMsg:''
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target
        console.log(name, value)
        this.setState(ps => ({
            inputs: {
                ...ps.inputs,
                [name]:value
            }
        }
        ))
    }

    clearInputs = () => {
        this.setState({
            inputs: {},
            errMsg: ''
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.props.submit, this.state.inputs)
        this.props.submit(this.state.inputs)
            // .then(() => this.clearInputs())
            // .catch(err => {
            //     this.setState({
            //         errMsg: err.data
            //     })
            // })
    }

    render() {
        const props = {
            ...this.state,
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit
        }
        return (
                this.props.children(props)
        )
    }
}
