import React from 'react'
import { Outlet, useLocation, Link, useParams } from 'react-router-dom'
// import { Link, useNavigate, useLocation } from "react-router-dom"

function ReviewLayout() {
    let {reviewId} = useParams();
    console.log(1)
    return (
        <>
            <header className='text-[40px] font-semibold bg-gradient-to-br from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%] inline-block text-transparent bg-clip-text'>
                <Link to='/review'>Review</Link>
                {location.pathname.startsWith('/review/') && (
                    <>
                        <span className='text-[36px] max-2xl:text-[30px] mx-5'>&gt;</span>
                        <Link to={`/review/${reviewId}`}>
                            <span className='text-[36px] max-2xl:text-[30px]'>{reviewId}</span>
                        </Link>
                    </>
                )}
            </header>
            <div className='w-full h-auto flex mt-5'>
                <Outlet />
            </div>
        </>
    )
}

export default ReviewLayout