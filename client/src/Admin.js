import React, { Component } from 'react'
import axios from 'axios'
import {withDataProvider} from './providers/DataProvider'

class Admin extends Component {
    constructor(){
        super()
        this.state = {
            study:{
                seriesid: '',
                startyear: '',
                endyear: '',
                title:'',
                subtitle:'',
                description:'',
                yAxisName:''
            },
            toggle: false,
            studies:[],
            errMsg:'',
            currentStudyId :'',
            currentStudy:{},

        }
    }

    getStudies = () => {
        return axios.get('/api/bls')
            .then(res => {
                this.setState({
                    studies:res.data
                })
            })
            .catch(err => {
                this.setState({
                    errMsg: err
                })
            })
    }

    handleChange = ({target: {name, value}}) => {
        this.setState(ps => ({
            study:{
                ...ps.study,
                [name]:value
            }
        }))
    }

    handleSelect = async ({target: {name, value}}) => {
        await this.getStudies()
        const foundStudy = this.state.studies.find(study => study.seriesid === value)
        this.setState({
            currentStudyId:value,
            currentStudy: foundStudy,
            study:{
                ...foundStudy
            }
        })
    }

    handleSubmit = (e) => {

        e.preventDefault()
        e.target.id === 'edit' ? this.props.updateData(this.state.currentStudyId, this.state.study): this.props.getNewData(this.state.study)
        console.log(e.target.id)
        // 
    }

    changeToggle = () => {
        this.setState(ps => ({
            toggle: !ps.toggle
        }))
    }

    componentDidMount(){
        this.getStudies()
    }

    render() {
        const switchArr = this.state.studies.map(study => <option key={study.seriesid} name="seriesid" value={study.seriesid}>{study.seriesid}</option>) 

        switchArr.unshift(<option key='ph' name="seriesid" value='' placeholder='Select Study'>Select Study</option>)

        return (
        <div className='admin-form-container'>
            <h3>You found the admin page!!</h3>
            <button onClick={this.changeToggle}>{this.state.toggle ? 'Add Study' : 'Edit Study'}</button>
            { this.state.toggle ? 
            <>
            <h5>Edit Study</h5>
            <form id="edit" onSubmit={this.handleSubmit} className="admin-form">
                <select name="seriesid" placeholder='Series ID' onChange={this.handleSelect}>
                    {switchArr}
                </select>
                <input type="text" name='startyear' placeholder='Start Year' onChange={this.handleChange}/>
                <input type="text" name='endyear' placeholder='End Year' onChange={this.handleChange}/>
                { this.state.currentStudyId ? 
                <>
                    <input type="text" name='title' placeholder='Study Title' value={this.state.study.title || ''} onChange={this.handleChange}/>
                    <input type="text" name='subtitle' placeholder='Study Sub-Title' value={this.state.study.subtitle || ''} onChange={this.handleChange}/>
                    <textarea className='submission-field' type="text" name='description' placeholder='Study Description' value={this.state.study.description || ''} onChange={this.handleChange}/>
                    <input type="text" name='yAxisName' placeholder='Enter Y Axis Title' value={this.state.study.yAxisName || ''} onChange={this.handleChange}/>
                </>
                :
                <>
                    <input type="text" name='title' placeholder='Study Title' value={this.state.study.title} onChange={this.handleChange}/>
                    <input type="text" name='subtitle' placeholder='Study Sub-Title' value={this.state.study.subtitle} onChange={this.handleChange}/>
                    <textarea className='submission-field' type="text" name='description' placeholder='Study Description' value={this.state.study.description} onChange={this.handleChange}/>
                    <input type="text" name='yAxisName' placeholder='Enter Y Axis Title' value={this.state.study.yAxisName} onChange={this.handleChange}/>
                </>
                }

                <button>Submit</button>
            </form>
            </>
            :
            <>
            <h5>Add study to the admin page:</h5>
            <form onSubmit={this.handleSubmit} className="admin-form">
                <input type="text" name='seriesid' placeholder='Series ID' onChange={this.handleChange}/>
                <input type="text" name='startyear' placeholder='Start Year' onChange={this.handleChange}/>
                <input type="text" name='endyear' placeholder='End Year' onChange={this.handleChange}/>
                <input type="text" name='title' placeholder='Study Title' onChange={this.handleChange}/>
                <input type="text" name='subtitle' placeholder='Study Sub-Title' onChange={this.handleChange}/>
                <textarea className='submission-field' type="text" name='description' placeholder='Study Description' onChange={this.handleChange}/>
                <input type="text" name='yAxisName' placeholder='Enter Y Axis Title' onChange={this.handleChange}/>
                <button>Submit</button>
            </form>
            </>
            
            }

        </div>
        )
    }
}

export default withDataProvider(Admin)