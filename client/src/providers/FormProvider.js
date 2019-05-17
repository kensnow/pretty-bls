import React, { Component } from 'react'

export default class FormHandler extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputs: props.inputs
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState(ps => ({
            inputs: {
                ...ps.inputs,
                [name]:value
            }
        }
        ))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.submit(this.state.inputs)
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
