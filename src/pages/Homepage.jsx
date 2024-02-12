import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import HomepageBG from '../assets/HomepageBG.png'
import Logo from '../assets/Logo.png'
import { UserAuth } from '../context/AuthContext';

function Homepage() {
    const navigate = useNavigate();
    return (
        <div style={{ backgroundImage: `url(${HomepageBG})` }}
            className='bg-no-repeat bg-cover bg-center h-screen px-40 max-2xl:px-28 py-16 max-2xl:py-12 bg-[#181754] text-white'>
            <div className='flex justify-between items-center'>
                <div className='logo'>
                    <Link to='/'><img src={Logo} alt="Logo" className='w-28 max-2xl:w-24' /></Link>
                </div>
                <ul className='flex gap-10'>
                    <li>
                        <Link to='signIn' className=''>Sign In</Link>
                    </li>
                    <li>
                        <Link to='signUp' className='box-btnGradient text-[#0cb6ff] px-5 py-2'>Sign Up</Link>
                    </li>
                </ul>
            </div>
            <div className='h-full flex flex-col justify-center items-center'>
                <h2 className='font-semibold text-[80px] max-2xl:text-[60px] tracking-[2px]'>HOW TO</h2>
                <h1 className='font-bold text-[120px] max-2xl:text-[90px] tracking-[15px] mt-[-55px] max-2xl:mt-[-40px] textTitleGradient'
                >
                    REGISTER</h1>
                <div className='flex flex-col items-center text-[22px] max-2xl:text-[18px] font-light mt-2 max-2xl:mt-0'>
                    <p className=''>There are several steps to help you get ready for your college experience</p>
                    <p className=''>here are some tips on how to register for college classes.</p>
                </div>
                <button onClick={() => navigate('dashboard')}
                    className='box-btnGradient text-[20px] max-2xl:text-[18px] text-[#0cb6ff] px-9 py-3 mt-20 max-2xl:mt-12'
                >
                    Get Started
                </button>
            </div>
        </div>
    )
}

export default Homepage