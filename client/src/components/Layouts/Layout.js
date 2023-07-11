import React from 'react'
import { userMenus } from './Menus/UserMenus.js';
import '../../styles/Layout.css';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
const Layout = ({ children }) => {
    const location = useLocation();
    const sidebarMenus = userMenus;

    const handleLogout = () => {
        localStorage.clear();
        <Navigate to={'/login'} />
        toast.success('Logout Successfully');
    }

    return (
        <>
            <div className="row">
                <div className="col-md-2 sidebar">
                    <div className="logo">
                        <h6>JOB PORTAL</h6>
                    </div>
                    <hr />
                    <p className="text-center">WelCome , Username</p>
                    <hr />
                    <div className="menus">
                        {sidebarMenus.map(menu => {
                            const isActive = location.pathname === menu.path;
                            return (
                                <div className={`menu-item ${isActive && "active"}`}>
                                    <i className={menu.icon}></i>
                                    <Link to={menu.path}>{menu.name}</Link>
                                </div>
                            )
                        })}
                        <div className={`menu-item`} onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <Link to={'/login'}>Logout</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-9">{children}</div>
            </div>
        </>
    )
}

export default Layout