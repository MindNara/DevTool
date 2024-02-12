import React from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom"

function SidebarHowToRegister() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className='w-[90px] h-[90px] bg-[#181754] rounded-[30px] py-10 max-2xl:py-8 flex justify-center items-center'>
            <button onClick={() => { navigate(-1) }}>
                <img width="40" height="40" src="https://img.icons8.com/sf-black/FFFFFF/back.png" alt="back" />
            </button>
        </div>
    )
}

export default SidebarHowToRegister