import React, { useState } from 'react'
import SignInBG from '../assets/SignInBG.png'
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from '../assets/Logo.png'
import SignInImage from '../assets/SignInImage.png'
import { UserAuth } from '../context/AuthContext';
import { Button } from '@material-tailwind/react';


function SignIn() {
    const { user } = UserAuth();
    if (user) {
        return <Navigate to='/dashboard' />;
    }

    //signin
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signIn } = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
            await signIn(email, password)
            navigate('/dashboard')
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    };
    //

    return (
        <div style={{ backgroundImage: `url(${SignInBG})` }}
            className='bg-no-repeat bg-cover bg-center h-screen px-40 py-16 bg-[#181754] text-white'
        >
            <div className='flex justify-center items-center h-full text-3xl'>
                <div className='flex flex-col justify-center items-center w-1/2'>
                    <Link to='/'><img src={Logo} alt="Logo" className='w-28' /></Link>
                    <h1 className='font-bold text-[50px] tracking-[2px] mt-4'>LOGIN</h1>
                    <p className='font-light text-[30px] tracking-[2px] mt-4'>Login to continues</p>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-6 mt-6'>
                        <div className='input-box'>
                            <img width="35" height="35" src='https://img.icons8.com/fluency-systems-regular/48/151c38/new-post.png' className='icon mt-3 ml-6'></img>
                            <input type='email' name='email' placeholder='Email' className='w-[600px] h-[60px] font-light' onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div className='input-box'>
                            <img width="35" height="35" src='https://img.icons8.com/fluency-systems-regular/48/151c38/password--v1.png' className='icon mt-3 ml-6'></img>
                            <input type='password' name='password' placeholder='Password' className='w-[600px] h-[60px] font-light' onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                        <button className='box-btnGradient font-bold text-[20px] text-[#0cb6ff] flex flex-col justify-center items-center py-3 mt-10 w-[600px]'>LOGIN</button>
                    </form>

                </div>
                <div className='flex flex-col justify-center items-center ml-20 w-1/2'>
                    <img src={SignInImage}></img>
                    <div>
                        <p className='font-normal text-[25px] inline'>Don't have an account ?  </p>
                        <Link to='/signUp' className='font-normal text-[25px] textSignInGradient underline underline-offset-4 decoration-[#3753cf8f] inline'>Sign Up</Link>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default SignIn