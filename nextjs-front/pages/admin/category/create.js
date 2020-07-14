import { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../../../config'
import { showSuccessMessage, showErrorMessage } from '../../../helpers/alerts'
import Layout from '../../../components/Layout'
import withAdmin from '../../withAdmin'

const Create = ({user, token}) => {
    const [state, setState] = useState({
        name: '',
        content: '',
        error: '',
        success: '',
        formData: process.browser && new FormData(),
        buttonText: 'Create',
        imageUploadText: 'Upload image'
    })

    const { name, content, success, error, formData, buttonText, imageUploadText } = state

    const handleChange = (name) => (e) => {
        const value = name === 'image' ? e.target.files[0] : e.target.value
        const imageName = name === 'image' ? e.target.files[0].name : 'Upload image'
        formData.set(name, value)
        setState({ ...state, [name]: value, error: '', success: '', imageUploadText: imageName })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setState({ ...state, buttonText: 'Creating' })
        // console.log(...formData)
        try{   
            const response = await axios.post(`${API}/category`, formData, {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })
            console.log('Category create response', response)
            setState({...state, name: '', content: '', formData: '', buttonText: 'Created', imageUploadText: 'Upload image', success: `${response.data.name} is created`})
        }catch (error){
            console.log('Category create error', error)
            setState({...state, name: '', buttonText: 'Create', error: error.response.data.error })
        }
    }

    const createCategoryForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input onChange={handleChange('name')} value={name} type="text" className="form-control" required />
                </div>
                <div className="form-group">
                    <label className="text-muted">Content</label>
                    <textarea onChange={handleChange('content')} value={content} className="form-control" required />
                </div>
                <div className="form-group">
                    <label className="btn btn-outline-secondary">{imageUploadText}
                        <input onChange={handleChange('image')} type="file" accept="image/*" className="form-control" hidden />
                    </label>
                </div>
                <div>
                    <button className="btn btn-outline-warning">
                        {buttonText}
                    </button>
                </div>
            </form>
        )
    }

    return (
        <Layout>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Create category</h1>
                    <br />
                    {success && showSuccessMessage(success)}
                    {error && showErrorMessage(error)}
                    {createCategoryForm()}
                </div>
            </div>
        </Layout>
    )
}

export default withAdmin(Create)