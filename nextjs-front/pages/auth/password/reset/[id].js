import { useState, useEffect } from 'react'
import Router, {withRouter} from 'next/router'
import axios from 'axios'
import { showSuccessMessage, showErrorMessage } from '../../../../helpers/alerts'
import { API } from '../../../../config'
import jwt from 'jsonwebtoken'
import Layout from '../../../../components/Layout'

const ResetPassword = ({router}) => {
    const [state, setState] = useState({
        name: '',
        token: '',
        newPassword: '',
        buttonText: 'Reset Password',
        success: '',
        error: ''
    })

    const { name, token, newPassword, buttonText, success, error } = state

    useEffect(() => {
        const decoded = jwt.decode(router.query.id)
        if(decoded) {
            setState({...state, name: decoded.name, token: router.query.id})
        }
    }, [router]) //run when theres a change in the router

    const handleChange = e => {
        setState({ ...state, newPassword: e.target.value, success: '', error: '' })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setState({...state, buttonText: 'Sending'})
        try{
            const response = await axios.put(`${API}/reset-password`, {resetPasswordLink: token, newPassword})
            setState({
                ...state, newPassword: '', buttonText: 'Done', success: response.data.message
            })

        }catch (error){
            console.log('Reset pw error', error)
            setState({
                ...state, buttonText: 'Forgot password', error: error.response.data.error
            })
        }
    }

    const passwordResetForm = () => {
        return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="password" className="form-control" onChange={handleChange} value={newPassword} placeholder="Type your new password" required />
            </div>
            <div>
                <button className="btn btn-outline-warning">{buttonText}</button>
            </div>
        </form>
        )
    }

    return (
        <Layout>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Hi {name}, reset your password in the form below</h1>
                    <br />
                    {success && showSuccessMessage(success)}
                    {error && showErrorMessage(error)}
                    {passwordResetForm()}
                </div>
            </div>
        </Layout>
    )
}

export default withRouter(ResetPassword)