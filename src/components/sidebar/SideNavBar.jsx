import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom"
import Logo from '../../assets/Logo.png'
import './SideNavBarStyle.css'
import { SidebarHowToRegister } from '../../components/index'
import { Button } from '@material-tailwind/react'
import { auth } from '../../config/firebase'; // ต้องแก้ตาม path ของไฟล์ firebase.js หรือตามที่คุณตั้งชื่อไฟล์ไว้
import { signOut } from "firebase/auth"; // Import signOut function from Firebase authentication

function SideNavBar({ toggle, isOpen, setIsOpen }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('isOpen', isOpen);
    }, [isOpen]);

    // Function to handle user logout
    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign out the current user
            navigate('/'); // Navigate to the sign-in page after successful logout
        } catch (error) {
            console.error("Logout error:", error.message);
        }
    };


    return (
        <div className='fixed h-screen p-2'>
            <div className={`sidebar ${isOpen ? '' : 'active'} max-2xl:w-[240px] bg-[#181754] h-full rounded-[30px] text-white py-10 max-2xl:py-8 flex flex-col justify-between`}>
                <div className='header flex justify-between items-center pl-10 max-2xl:pl-8 pr-8 h-[50px]'>
                    <Link className='logo' to='/'><img src={Logo} alt="Logo" className='w-28 max-2xl:w-24' /></Link>
                    <button
                        className={`menuToggle ${isOpen ? '' : 'active'}`}
                        onClick={toggle}
                    >
                        <img className='max-2xl:w-6' width="35" height="35" src="https://img.icons8.com/sf-black/FFFFFF/menu.png" alt="menu" />
                    </button>
                </div>
                <ul className='pl-5'>
                    <li className={location.pathname === '/announcement' && 'active'}>
                        <Link to='/announcement'>
                            <img src={`https://img.icons8.com/fluency-systems-filled/${location.pathname === '/announcement' ? '181754' : 'FFFFFF'}/home.png`} alt="home" />
                            <span>Announcement</span>
                        </Link>
                    </li>
                    <li className={location.pathname === '/review' || location.pathname.startsWith('/review/') ? 'active' : ''}>
                        <Link to='/review'>
                            <img src={`https://img.icons8.com/fluency-systems-filled/${location.pathname === '/review' || location.pathname.startsWith('/review/') ? '181754' : 'FFFFFF'}/very-popular-topic.png`} alt="very-popular-topic" />
                            <span>Review</span>
                        </Link>
                    </li>
                    <li className={location.pathname === '/howToRegister' && 'active'}>
                        <Link to='/howToRegister'>
                            <img src={`https://img.icons8.com/material-rounded/${location.pathname === '/howToRegister' ? '181754' : 'FFFFFF'}/idea--v1.png`} alt="idea--v1" />
                            <span>How To Register</span>
                        </Link>
                    </li>
                </ul>
                <Link className='ml-10 max-2xl:ml-8 mr-8 flex gap-4'
                    onClick={handleLogout}
                >
                    <img className='' width='24' height='24' src="https://img.icons8.com/ios-filled/FFFFFF/logout-rounded.png" alt="logout-rounded" />
                    <span className='font-light'>Logout</span>
                </Link>
            </div>
        </div>
    )
}

export default SideNavBar
