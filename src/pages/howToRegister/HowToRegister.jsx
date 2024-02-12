import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import Plx from "react-plx";
import { howToRegisterData } from '../../constants/howToRegisterData';

import {
  BG01,
  BG02,
  BG03,
  BG04,
  BG05,
  BG06,
  BG07,
  BG08,
} from '../../assets/register/index';

function HowToRegister() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className='relative'>
      <div className='p-2 fixed z-10'>
        <div className='w-[70px] max-2xl:w-[65px] h-[70px] max-2xl:h-[65px] bg-[#181754] rounded-[20px] max-2xl:rounded-[16px] flex justify-center items-center'>
          <button onClick={() => { navigate(-1) }}>
            <img className='w-[40px] max-2xl:w-[35px]' src="https://img.icons8.com/sf-black/FFFFFF/back.png" alt="back" />
          </button>
        </div>
      </div>
      <div className='px-28 relative h-auto'>
        <div className='absolute left-0 z-0 bg-auto bg-no-repeat bg-[#181754] w-full'>
          <img src={BG01} alt="BG01" />
          <img className='pt-[12rem] max-2xl:pt-[6rem] max-2xl:w-[75%]' src={BG02} alt="BG02" />
          <img className='pt-[10rem] max-2xl:pt-[5rem] pl-[36rem] max-2xl:pl-[25rem] max-2xl:w-[55rem]' src={BG03} alt="BG03" />
          <img className='mt-[-20rem] max-2xl:mt-[-12rem]' src={BG04} alt="BG04" />
          <img className='pl-[36rem] max-2xl:pl-[25rem] max-2xl:w-[60rem] mt-[-10rem] max-2xl:mt-[-16rem]' src={BG05} alt="BG05" />
          <img className='pt-[8rem] max-2xl:pt-[0rem] max-2xl:w-[75rem]' src={BG06} alt="BG06" />
          <img className='pt-[13rem] max-2xl:pt-[5rem] pl-[36rem] max-2xl:pl-[25rem] max-2xl:w-[50rem]' src={BG07} alt="BG07" />
          <img className='pt-[15rem] max-2xl:pt-[8rem] max-2xl:w-[70rem]' src={BG08} alt="BG08" />
        </div>

        <Plx
          className='title h-screen flex flex-col justify-center items-center text-white'
          tagName={'div'}
          parallaxData={[
            {
              start: 0,
              end: 2000,
              properties: [
                {
                  startValue: 0,
                  endValue: 100,
                  property: "translateY",
                },
                {
                  startValue: 1,
                  endValue: 0,
                  property: "opacity",
                },
              ],
            },
          ]}
        >
          <h1 className='font-semibold text-[120px] max-2xl:text-[76px] tracking-[2px] uppercase'>
            <TypeAnimation
              sequence={[
                'How To Register',
                2000,
                'How To ',
                1500,
              ]}
              wrapper="span"
              repeat={Infinity}
            />
          </h1>
          <span className='font-light text-[24px] max-2xl:text-[18px] text-center'>
            <p>There are several steps to help you get ready for your college experience,</p>
            <p>here are some tips on how to register for college classes.</p>
          </span>
        </Plx>

        <div className='mt-52'>
          {howToRegisterData.map((item, index) => {
            const isOdd = index % 2 === 0;
            console.log(item.image);

            if (index === 0 || isOdd) {
              return (
                <div className='h-auto relative z-20 flex justify-around max-2xl:justify-between pb-52 max-2xl:pb-24'>
                  <span className='text-white ml-20 max-2xl:ml-2 mt-10'>
                    <div className='flex items-center gap-10'>
                      <div className='w-36 max-2xl:w-24 h-[4px] max-2xl:h-[3px] bg-white'></div>
                      <h1 className='text-[80px] max-2xl:text-[55px] font-semibold bg-gradient-to-b from-[#029FE2] from-[29.69%] to-[#FFFFFF] to-[100%] inline-block text-transparent bg-clip-text'>{item.title}</h1>
                    </div>
                    <div className='flex flex-col gap-5 max-2xl:gap-2'>
                      <h2 className='text-[38px] max-2xl:text-[26px] font-medium tracking-[2px] my-5 max-2xl:my-4'>{item.detail}</h2>
                      {item.step.map((step, _) => {
                        return (
                          <li className='text-[24px] max-2xl:text-[18px] font-light'>{step}</li>
                        );
                      })}
                    </div>
                    <div className='flex flex-col w-5 items-center gap-2 mt-40 max-2xl:mt-12'>
                      <p className='text-[30px] max-2xl:text-[24px] font-semibold bg-gradient-to-b from-[#029FE2] from-[29.69%] to-[#FFFFFF] to-[100%] inline-block text-transparent bg-clip-text'>0{item.id}.</p>
                      <div className='h-12 max-2xl:h-8 w-[3px] bg-white'></div>
                    </div>
                  </span>
                  <img className='w-[55%]' src={`/register/${item.image}`} alt={`HowToRegister0${index + 1}`} />
                </div>
              );
            } else {
              return (
                <div className='h-auto z-10 relative flex justify-around max-2xl:justify-between pb-52 max-2xl:pb-24'>
                  <img className='w-[55%]' src={`/register/${item.image}`} alt={`HowToRegister0${index + 1}`} />
                  <span className='text-white mx-10 max-2xl:mx-5 mt-10'>
                    <div className='flex items-center gap-10'>
                      <h1 className='text-[80px] max-2xl:text-[55px] font-semibold bg-gradient-to-b from-[#029FE2] from-[29.69%] to-[#FFFFFF] to-[100%] inline-block text-transparent bg-clip-text'>{item.title}</h1>
                      <div className='w-36 max-2xl:w-24 h-[4px] max-2xl:h-[3px] bg-white'></div>
                    </div>
                    <div className='flex flex-col gap-5 max-2xl:gap-2'>
                      <h2 className='text-[38px] max-2xl:text-[26px] font-medium tracking-[2px] my-5 max-2xl:my-4'>{item.detail}</h2>
                      {item.step.map((step, _) => {
                        return (
                          <li className='text-[24px] max-2xl:text-[18px] font-light'>{step}</li>
                        );
                      })}
                    </div>
                    <div className='w-full flex justify-end mt-52 max-2xl:mt-16'>
                      <span className='flex flex-col items-center w-5 gap-2'>
                        <p className='text-[30px] max-2xl:text-[24px] font-semibold bg-gradient-to-b from-[#029FE2] from-[29.69%] to-[#FFFFFF] to-[100%] inline-block text-transparent bg-clip-text'>0{item.id}.</p>
                        <div className='h-12 max-2xl:h-8 w-[3px] bg-white'></div>
                      </span>
                    </div>
                  </span>
                </div>
              );
            }
          })}
        </div>
      </div >
    </div >
  )
}

export default HowToRegister;