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
        scaleMod:0,
        type:'bar'

    }
    return (
        <FormProvider inputs={inputs} submit={(inputs) => props.updateChartSettings(inputs)}>
            {
                ({handleChange, handleSubmit, errMsg}) => {
                    const handleLogToggle = (e) => {
                        setToggle(!toggle)
                        handleChange(e)
                    }
                    return (
                        <div className='chartSettings-container'>
                            <h4>Chart Settings:</h4>
                            <div className="time-button-container">
                                <button className="time-button 3-year" onClick={() => props.timeSeriesButtonClick('3', props.seriesid)} >3 years</button>
                                <button className="time-button 10-year" onClick={() => props.timeSeriesButtonClick('10', props.seriesid)}>10 years</button>
                                <button className="time-button 20-year" onClick={() => props.timeSeriesButtonClick('20', props.seriesid)}>20 years</button>
                                <button className="time-button all" onClick={() => props.timeSeriesButtonClick('all', props.seriesid)}>all</button>
                            </div>
                            <form onSubmit={handleSubmit} className='chart-settings form'>
                                
                                <input onChange={handleChange} type="color" name='color1' defaultValue={props.chartSettings.color1}/>
                                {props.chartSettings.type === 'bar' && <input onChange={handleChange} type="color" name='color2' defaultValue={props.chartSettings.color2}/>}
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
                                <h4>Data Padding</h4>
                                <input onChange={handleChange} type="range" className='slider' name='scaleMod' min='0' max='10'/>
                                <button>update</button>
                            </form>
                        </div>
                    )
                }
            }
        </FormProvider>

    
    )


}

export default withChartProvider(ChartSettings)
