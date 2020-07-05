import { useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { showSuccessMessage, showErrorMessage } from '../helpers/alerts'
import {API} from '../config'
const Register = () => {

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: '',
        buttonText: 'Register'
    })

    const { name, email, password, error, success, buttonText } = state;

    const handleChange = (name) => (e) => {
        setState({ ...state, [name]: e.target.value, error: '', success: '', buttonText: 'Register' })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setState({ ...state, buttonText: 'Registering' })
        try{
            const res = await axios.post(`${API}/register`, {
                name,
                email,
                password
            })
            setState({
                ...state,
                name: '',
                email: '',
                password: '',
                buttonText: 'Submitted',
                success: res.data.message
            })
        }catch(err){
            setState({ ...state, buttonText: 'Register', error: error.response.data.error })
        }
    }


    const registerForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input value={name} onChange={handleChange('name')} type="text" className="form-control" placeholder="Type your name" required/>
                </div>
                <div className="form-group">
                    <input value={email} onChange={handleChange('email')} type="email" className="form-control" placeholder="Type your email" required/>
                </div>
                <div className="form-group">
                    <input value={password} onChange={handleChange('password')} type="password" className="form-control" placeholder="Type your password" required/>
                </div>
                <div className="form-group">
                    <button className="btn btn-outline-warning">{buttonText}</button>
                </div>
            </form>
        )
    }

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <h1>Register</h1>
                <br />
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
                {registerForm()}
            </div>
        </Layout>
    );

}

export default Register;