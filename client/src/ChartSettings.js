import React from 'react'
import FormProvider from './providers/FormProvider'
import {withChartProvider} from './providers/ChartProvider'

function ChartSettings(props) {
    const inputs = {
        color1:'',
        color2:'',

    }
    return (
        <FormProvider inputs={inputs} submit={(inputs) => props.updateChartSettings(inputs)}>
            {
                ({handleChange, handleSubmit, errMsg}) => {
                    return (
                        <form onSubmit={handleSubmit} className='chart-settings form'>
                            <h4>Chart Settings:</h4>
                            <input onChange={handleChange} type="color" name='color1' defaultValue={props.chartSettings.color1}/>
                            <input onChange={handleChange} type="color" name='color2' defaultValue={props.chartSettings.color2}/>
                            <button>Submit</button>
                        </form>
                    )
                }
            }
        </FormProvider>

    
    )


}

export default withChartProvider(ChartSettings)
