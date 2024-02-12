import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom"
import Logo from '../../assets/Logo.png'
import './SideNavBarStyle.css'
import { SidebarHowToRegister } from '../../components/index'
import { UserAuth } from '../../context/AuthContext'
import { Button } from '@material-tailwind/react'

function SideNavBar({ toggle, isOpen, setIsOpen }) {
    const { logout } = UserAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('isOpen', isOpen);
    }, [isOpen]);

    return (
        <div className='fixed h-screen p-2'>
            {location.pathname === '/howToRegister' ? (
                <>
                    {/* <div className='w-[90px] max-2xl:w-[80px] h-[90px] max-2xl:h-[80px] bg-[#181754] rounded-[30px] py-10 max-2xl:py-8 flex justify-center items-center'>
                        <button onClick={() => { navigate(-1); setIsOpen(true) }}>
                            <img className='w-[40px] max-2xl:w-[35px]' src="https://img.icons8.com/sf-black/FFFFFF/back.png" alt="back" />
                        </button>
                    </div> */}
                </>
            ) : (
                <>
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
                            <li className={location.pathname === '/dashboard' && 'active'}>
                                <Link to='/dashboard'>
                                    <img src={`https://img.icons8.com/fluency-systems-filled/${location.pathname === '/dashboard' ? '181754' : 'FFFFFF'}/home.png`} alt="home" />
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li className={location.pathname === '/review' || location.pathname.startsWith('/review/') ? 'active' : ''}>
                                <Link to='/review'>
                                    <img src={`https://img.icons8.com/fluency-systems-filled/${location.pathname === '/review' || location.pathname.startsWith('/review/') ? '181754' : 'FFFFFF'}/very-popular-topic.png`} alt="very-popular-topic" />
                                    <span>Review</span>
                                </Link>
                            </li>
                            <li className={location.pathname === '/studyPlan' || location.pathname.startsWith('/studyPlan/') ? 'active' : ''}>
                                <Link to='/studyPlan'>
                                    <img src={`https://img.icons8.com/material-rounded/${location.pathname === '/studyPlan' || location.pathname.startsWith('/studyPlan/') ? '181754' : 'FFFFFF'}/book.png`} alt="book" />
                                    <span>Study Plan</span>
                                </Link>
                            </li>
                            <li className={location.pathname === '/howToRegister' && 'active'}>
                                <Link to='/howToRegister' onClick={() => {
                                    // setIsOpen(false)
                                }}>
                                    <img src={`https://img.icons8.com/material-rounded/${location.pathname === '/howToRegister' ? '181754' : 'FFFFFF'}/idea--v1.png`} alt="idea--v1" />
                                    <span>How To Register</span>
                                </Link>
                            </li>
                        </ul>
                        <div className='profile-detail pl-10 max-2xl:pl-8 pr-8 flex justify-between items-center'>
                            <div className='profile-content flex items-center gap-5 max-2xl:gap-4'>
                                <div className='bg-white w-12 max-2xl:w-9 h-12 max-2xl:h-9 rounded-[50px]'></div>
                                <span className='username text-[18px] max-2xl:text-[14px] font-light'>Username</span>
                            </div>
                            <Button onClick={()=>logout()}>
                                <img className='max-2xl:w-5' width='24' height='24' src="https://img.icons8.com/ios-filled/FFFFFF/logout-rounded.png" alt="logout-rounded" />
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default SideNavBar