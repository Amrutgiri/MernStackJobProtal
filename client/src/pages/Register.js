import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import InputForm from './../components/shared/InputForm.js';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice.js';
import axios from 'axios';
import Spinner from '../components/shared/Spinner.js';
import { toast } from 'react-toastify';
const Register = () => {

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loading } = useSelector(state => state.alerts)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // form
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!name || !email || !password) {
                return toast.error("Please Provide all fields");
            }
            dispatch(showLoading());
            const { data } = await axios.post('/api/v1/auth/register', { name, lastname, email, password });
            dispatch(hideLoading());
            if (data.success) {
                toast.success("Registered Successfully");
                navigate('/dashboard');
            }

        } catch (error) {
            dispatch(hideLoading());
            toast.error("Invalid Form data Please Try Again");
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
                                <InputForm htmlFor="name" labelText={"Name"} type={"text"} name={'name'} value={name} handleChange={(e) => setName(e.target.value)} />
                                <InputForm htmlFor="lastname" labelText={"Last Name"} type={"text"} name={'lastname'} value={lastname} handleChange={(e) => setLastname(e.target.value)} />
                                <InputForm htmlFor="email" labelText={"Email"} type={"email"} name={'email'} value={email} handleChange={(e) => setEmail(e.target.value)} />
                                <InputForm htmlFor="password" labelText={"Password"} type={"password"} name={'password'} value={password} handleChange={(e) => setPassword(e.target.value)} />


                                <div className='d-flex justify-content-between'>
                                    <p>Already Registered ? <Link to={'/login'}>Login</Link></p>
                                    <button type="submit" className="btn btn-primary float-end">Register</button>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            )}

        </>
    )
}

export default Register