import React from 'react'
import { Link } from 'react-router-dom'
const NotFound = () => {
    return (
        <div>
            <h1>Page Not NotFound</h1>
            <Link className='btn btn-danger' to={'/'}>Go Back</Link>
        </div>
    )
}

export default NotFound