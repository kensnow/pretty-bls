import React from 'react'
import FormProvider from './providers/FormProvider'
import {withProfileProvider} from './providers/ProfileProvider'
import {withRouter} from 'react-router-dom'

function LogIn(props) {

    const inputs = {
        email:'',
        password:''
    }
    console.log(props)
    return (
        <FormProvider inputs={inputs} submit={(inputs) => props.logIn(inputs)}>
            {
                ({handleChange, handleSubmit, errMsg}) => {
                    return(
                        <form onSubmit={handleSubmit}>
                            <input onChange={handleChange} type="email" name='email' placeholder='enter email'/>
                            <input onChange={handleChange} type="password" name='password' placeholder='enter password'/>
                            
                            <button>Log In</button>
                            {props.errMsg && <p className='error'>{props.errMsg}</p>}
                        </form>
                    )
                }
            }
        </FormProvider>
    )
}

export default withProfileProvider(LogIn)
