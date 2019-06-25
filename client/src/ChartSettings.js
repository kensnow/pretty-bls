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
                        <div className='chart-settings-container chart-tool-container'>
                            <h3>Chart Settings:</h3>

                            <form onSubmit={handleSubmit} className='chart-settings-form'>
                            <div className='setting-section'>
                                <h5>History</h5>
                                <div className="time-button-container">
                                    <button className="time-button 3-year" onClick={() => props.timeSeriesButtonClick('3', props.seriesid)} >3 years</button>
                                    <button className="time-button 10-year" onClick={() => props.timeSeriesButtonClick('10', props.seriesid)}>10 years</button>
                                    <button className="time-button 20-year" onClick={() => props.timeSeriesButtonClick('20', props.seriesid)}>20 years</button>
                                    <button className="time-button all" onClick={() => props.timeSeriesButtonClick('all', props.seriesid)}>all</button>
                                </div>
 
                            </div>
                                <div className='setting-section'>
                                    <h5>Chart Type</h5>
                                    <select onChange={handleChange} name='type'>
                                        <option value="bar">bar</option>
                                        <option value="line">line</option>
                                    </select>
                                </div>
                                <div className='setting-section'>
                                    <h5>Chart Scale</h5>
                                    <select onChange={handleLogToggle} name='scale'>
                                        <option value="linear">linear</option>
                                        <option value="logarithmic">logarithmic</option>
                                    </select>
                                    {toggle && 
                                        <>
                                            <p>Log Scale:</p>
                                            <input onChange={handleChange} type='scaleLog' name='scaleLog'/>
                                        </>}
                                </div>
                                <div className='setting-section'>
                                    <h5>Chart Color</h5>
                                    <div className='color-picker-container'>
                                        <p>Color 1:</p>
                                        <input className='color-picker color1' onChange={handleChange} type="color" name='color1' defaultValue={props.chartSettings.color1}/>
                                    </div>
                                    
   
                                    {props.chartSettings.type === 'bar' && <div className='color-picker-container'><p>Color 2:</p><input className='color-picker color2' onChange={handleChange} type="color" name='color2' defaultValue={props.chartSettings.color2}/></div>}
                                </div>
                                <div className='setting-section'>
                                    <h5>Data Padding</h5>
                                    <input onChange={handleChange} type="range" className='slider' name='scaleMod' min='0' max='10' />
                                    
                                </div>
                                <button className='update-button button'>update</button>
                            </form>
                        </div>
                    )
                }
            }
        </FormProvider>

    
    )


}

export default withChartProvider(ChartSettings)
