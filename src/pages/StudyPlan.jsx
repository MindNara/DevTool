import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Outlet } from 'react-router-dom';

function StudyPlan() {
  const location = useLocation();

  return (
    <>
      <header className='text-[40px] max-2xl:text-[34px] font-semibold bg-gradient-to-br from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%] inline-block text-transparent bg-clip-text'>
        <p>
          <Link to='/studyPlan'>Study plan</Link>
          {location.pathname === '/studyPlan/result' && (
            <>
              <span className='text-[36px] max-2xl:text-[30px] mx-5'>&gt;</span>
              <Link to='/studyPlan/result'>
                <span className='text-[36px] max-2xl:text-[30px]'>ผลการค้นหา</span>
              </Link>
            </>
          )}
        </p>
      </header>
      <div className="flex items-center justify-center">
        <Outlet />
      </div >
    </>
  )
}

export default StudyPlan