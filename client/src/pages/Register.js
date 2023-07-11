import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Register = () => {

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // form
    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            console.log(name, email, password, lastname);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <div className='card'>
                        <div className='card-header'>
                            <img src='/assets/images/logo.png' alt='Logo' className='logo mb-2 ' />
                        </div>
                        <div className='card-body'>
                            <div className="mb-3 ">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3 ">
                                <label htmlFor="lastname" className="form-label">Last Name</label>
                                <input type="text" className="form-control" name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                            </div>
                            <div className="mb-3 ">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div className='d-flex justify-content-between'>
                                <p>Already Registered ? <Link to={'/login'}>Login</Link></p>
                                <button type="submit" className="btn btn-primary float-end">Register</button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>

        </>
    )
}

export default Register