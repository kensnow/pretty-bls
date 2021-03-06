import React, {useState} from 'react'
import FormProvider from './providers/FormProvider'
import {withProfileProvider} from './providers/ProfileProvider'

function SignUp(props) {
    console.log(props)
    const [errMsg, setErrMsg] = useState('')

    const inputs = {
        email:'',
        password:'',
        confirm:''
    }


    return (
        <FormProvider inputs={inputs} submit={(inputs) => {
            inputs.password === inputs.confirm ? 
            props.signUp(inputs): 
            setErrMsg('Please enter matching passwords')
            }}>
            {
                ({handleChange, handleSubmit}) => {
                    return(
                        <form className='user-validation-form signup-form form' onSubmit={handleSubmit}>
                            <h5>welcome!</h5>
                            <h3>Sign up:</h3>
                            <input onChange={handleChange} type="email" name='email' placeholder='enter email'/>
                            <input onChange={handleChange} type="password" name='password' placeholder='enter password'/>
                            <input onChange={handleChange} type="password" name='confirm' placeholder='confirm password'/>
                            <button className='button'>Sign Up</button>
                            {props.errMsg && <p className='error'>{props.errMsg}</p>}
                        </form>
                    )
                }
            }
        </FormProvider>
    )
}

export default withProfileProvider(SignUp)
