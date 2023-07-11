import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from "../../redux/features/alertSlice.js";
import axios from 'axios';
import { setUsers } from '../../redux/features/auth/authSlice.js';
import { Navigate } from 'react-router-dom';
const PrivateRoute = ({ children }) => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const getUser = async () => {
        try {
            dispatch(showLoading());
            const { data } = await axios.post('/api/v1/user/getUser', {
                token: localStorage.getItem('token')
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading());
            if (data.success) {
                dispatch(setUsers(data.data));
            } else {
                localStorage.clear();
                <Navigate to={'/login'} />
            }
        } catch (error) {
            localStorage.clear();
            dispatch(hideLoading());
            console.log(error);
        }
    }
    useEffect(() => {
        if (!user) {
            getUser();
        }
    });

    if (localStorage.getItem('token')) {
        return children;
    } else {
        return <Navigate to={'/login'} />;
    }
}

export default PrivateRoute