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

                        <form className='user-validation-form login-form form'onSubmit={handleSubmit}>
                            <h5>welcome back!</h5>
                            <h3>Log In:</h3>
                            <input onChange={handleChange} type="email" name='email' placeholder='enter email'/>
                            <input onChange={handleChange} type="password" name='password' placeholder='enter password'/>
                            
                            <button className="button">Log In</button>
                            {props.errMsg && <p className='error'>{props.errMsg}</p>}
                        </form>
                    )
                }
            }
        </FormProvider>
    )
}

export default withProfileProvider(LogIn)
