import React, { useState } from 'react'
import InputForm from './../components/shared/InputForm.js';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import Spinner from './../components/shared/Spinner.js';
import { toast } from 'react-toastify';
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.alerts);


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(showLoading());
            const { data } = await axios.post('/api/v1/auth/login', { email, password });
            if (data.success) {
                dispatch(hideLoading());
                localStorage.setItem('token', data.token);
                toast.success("Login Successfully");
                navigate("/dashboard");
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Invalid Credential Please try again");
            console.log(error);
        }
    }
    return (
        <>
            {loading ? (<Spinner />) : (
                <div className='form-container'>
                    <form onSubmit={handleSubmit}>
                        <div className='card'>
                            <div className='card-header'>
                                <img src='/assets/images/logo.png' alt='Logo' className='logo mb-2 ' />
                            </div>
                            <div className='card-body'>
                                <InputForm htmlFor="email" labelText={"Email"} type={"email"} name={'email'} value={email} handleChange={(e) => setEmail(e.target.value)} />
                                <InputForm htmlFor="password" labelText={"Password"} type={"password"} name={'password'} value={password} handleChange={(e) => setPassword(e.target.value)} />


                                <div className='d-flex justify-content-between'>
                                    <p>Not Registered ? <Link to={'/register'}>Register</Link></p>
                                    <button type="submit" className="btn btn-primary float-end">Login</button>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            )}

        </>
    )
}

export default Login