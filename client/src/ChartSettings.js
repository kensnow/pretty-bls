import React, {useState} from 'react'
import FormProvider from './providers/FormProvider'
import {withChartProvider} from './providers/ChartProvider'

function ChartSettings(props) {
    const [toggle, setToggle] = useState(false)
    const inputs = {
        color1:'#341C1C',
        color2:'#ADFCF9',
        scale:'linear',
        scaleLog:'2',
        type:'bar'

    }


    console.log(inputs)
    return (
        <FormProvider inputs={inputs} submit={(inputs) => props.updateChartSettings(inputs)}>
            {
                ({handleChange, handleSubmit, errMsg}) => {
                    const handleLogToggle = (e) => {
                        setToggle(!toggle)
                        handleChange(e)
                    }
                    return (
                        <form onSubmit={handleSubmit} className='chart-settings form'>
                            <h4>Chart Settings:</h4>
                            <input onChange={handleChange} type="color" name='color1' defaultValue={props.chartSettings.color1}/>
                            <input onChange={handleChange} type="color" name='color2' defaultValue={props.chartSettings.color2}/>
                            <h4>Chart Type</h4>
                            <select onChange={handleChange} name='type'>
                                <option value="bar">bar</option>
                                <option value="line">line</option>
                            </select>
                            <h4>Chart Scale</h4>
                            <select onChange={handleLogToggle} name='scale'>
                                <option value="linear">linear</option>
                                <option value="logarithmic">logarithmic</option>
                            </select>
                            {toggle && 
                                <>
                                    <p>Log Scale:</p>
                                    <input onChange={handleChange} type='scaleLog' name='scaleLog'/>
                                </>}
                            <button>update</button>
                        </form>
                    )
                }
            }
        </FormProvider>

    
    )


}

export default withChartProvider(ChartSettings)
