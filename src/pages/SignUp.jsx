import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../config/firebase'; // Import Firebase authentication and Firestore instance
import SignUpBG from '../assets/SignUpBG.png';
import Logo from '../assets/Logo.png';
import SignUpImage from '../assets/SignUpImage.png';
import { collection, addDoc } from 'firebase/firestore';

function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User registered successfully:", userCredential.user);

            // Determine role based on email
            let role = "student"; // Default role
            if (email === "admin@gmail.com") {
                role = "admin"; // Change role to "admin" if email is admin@gmail.com
            }

            // Add user data to Firestore collection "user" (not "users")
            const userData = { email, userId: userCredential.user.uid, role }; // Create user data object
            await addDoc(collection(db, "user"), userData); // Add user data to Firestore

            navigate('/signIn');
        } catch (error) {
            setError(error.message);
            console.error("Signup error:", error.message);
        }
    };

    return (
        <div style={{ backgroundImage: `url(${SignUpBG})` }} className='bg-no-repeat bg-cover bg-center h-screen px-40 py-16 bg-[#181754] text-white'>
            <div className='flex justify-center items-center h-full text-3xl'>
                <div className='flex flex-col justify-center items-center w-1/2 mr-6'>
                    <img src={SignUpImage} alt="Sign Up Image" />
                    <div>
                        <p className='font-normal text-[25px] inline'>Already have an account? </p>
                        <Link to='/signIn' className='font-normal text-[25px] textSignInGradient underline underline-offset-4 decoration-[#3753cf8f] inline'>Log In</Link>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center w-1/2 ml-20'>
                    <Link to='/'><img src={Logo} alt="Logo" className='w-28' /></Link>
                    <h1 className='font-bold text-[50px] tracking-[2px] mt-4'>REGISTER</h1>
                    <p className='font-light text-[30px] tracking-[2px] mt-4'>Create New Account</p>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-6 mt-6'>
                        <div className='input-box'>
                            <img width="35" height="35" src='https://img.icons8.com/fluency-systems-regular/48/151c38/new-post.png' className='icon mt-3 ml-6' alt="Email Icon" />
                            <input type='text' name='email' placeholder='Email' className='w-[600px] h-[60px] font-light' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='input-box'>
                            <img width="35" height="35" src='https://img.icons8.com/fluency-systems-regular/48/151c38/password--v1.png' className='icon mt-3 ml-6' alt="Password Icon" />
                            <input type='password' name='password' placeholder='Password' className='w-[600px] h-[60px] font-light' onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className='box-btnGradient font-bold text-[20px] text-[#0cb6ff] flex flex-col justify-center items-center py-3 mt-10 w-[600px]'>SIGNUP</button>
                    </form>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default SignUp;
