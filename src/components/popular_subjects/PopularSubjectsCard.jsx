import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const DetailSubjectsCard = [
  {
    coursecode: "06016321",
    subjectname: "DISCRETE MATHEMATICS (คณิตศาสตร์ไม่ต่อเนื่อง)",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut...",
  },
  {
    coursecode: "06016366",
    subjectname: "Engineering Material",
    description: "วิชานี้ภาษาไทยชื่อวัสดุวิศวกรรม หรือเด็กวิศวะจะเรียนสั้นๆว่า Material",
  }
];

const PopularSubjectsCard = () => {
    const MAX_DESCRIPTION_LENGTH = 60;
  
    return (
      <div className="mt-8 relative">
        {DetailSubjectsCard.map((subject, index) => (
          <Link
            to={`/review/${subject.coursecode}`}
            key={index}
            className="relative group"
          >
            {/* กล่องเล็กที่จะทับข้างบน */}
            <div className="absolute top-[-13px] left-4 w-[120px] h-[27px] flex-shrink-0 z-10 rounded-[10px] bg-[#151C38] flex items-center justify-center group-hover:border-[#181754] group-active:border-[#02A0E2]">
              <p className="text-[15px] font-semibold text-white">{subject.coursecode}</p>
            </div>
  
            {/* กล่องหลัก */}
            <div className="flex-shrink-0 z-0 border-[1.5px] border-solid border-gray-300 rounded-[15px] p-6 bg-white transition-colors duration-300 group-hover:border-[#181754] group-active:border-[#02A0E2]">
              <div className="justify-center text-base font-semibold text-gray-800 mb-2">
                {subject.subjectname}
              </div>
              <div className="text-black font-light text-sm">
                {/* ใช้ slice เพื่อจำกัดจำนวนตัวอักษรที่แสดง */}
                {subject.description.slice(0, MAX_DESCRIPTION_LENGTH)}
                {subject.description.length > MAX_DESCRIPTION_LENGTH && '...'}
              </div>
              <div className="mt-2">
                <Icon icon="bi:star-fill" color="#fec60f" width="22" height="22" />
              </div>
            </div>
  
            {/* ระยะห่างกล่อง */}
            <div className="mb-6" />
          </Link>
        ))}
      </div>
    );
  };
  
export default PopularSubjectsCard;
