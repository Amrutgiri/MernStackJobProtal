import React from 'react'
import '../styles/HomePage.css';
import { Link } from 'react-router-dom';
const HomePage = () => {
    return (
        <>
            <video autoPlay muted loop id='myVideo'>
                <source src="/assets/videos/bg.mp4" type='video/mp4' />
            </video>
            <div className="content">
                <div className="card p-3 w-25 jpcard">
                    <img src="/assets/images/logo.png" alt="Job Portal Logo" className="homeLogo" />
                    <div className="card-body cardContent">
                        <h4 className="card-title">India's No. #1 Career Platform</h4>
                        <p className="card-text">
                            Easy to Search and Manage Your Jobs. Free Job Portal Application by APINFO.
                        </p>
                        <div className='d-flex justify-content-between mt-5'>
                            <p>Not a user Register <Link to={'/register'}>Register Here !</Link></p>
                            <p>
                                <Link to='/login' className='myBtn'>Login</Link>
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage