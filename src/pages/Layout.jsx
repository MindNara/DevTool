import React, { useState, useEffect } from 'react'
import { Outlet, Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { SideNavBar } from '../components/index'
import '../index.css'
import BG01 from '../assets/register/BG01.png'
import { UserAuth } from '../context/AuthContext';

function Layout() {
    const { user } = UserAuth();

    
    const location = useLocation();
    const initialIsOpen = localStorage.getItem('isOpen') === 'false' ? false : true;
    const [isOpen, setIsOpen] = useState(initialIsOpen);

    const toggle = () => {
        setIsOpen(!isOpen);
    };
    if (!user) {
        return <Navigate to='/signin' />;
    }
    else
    return (
        <div className={`flex flex-raw`}>
            <div className={`layout ${isOpen === true ? 'active' : ''}`}>
                <SideNavBar toggle={toggle} isOpen={isOpen} setIsOpen={setIsOpen} location={location} />
            </div>
            <div className={`h-auto w-full m-10`}>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout