import React from 'react'
import { useNavigate } from 'react-router-dom';

function StudyPlanForm() {
    const navigate = useNavigate();

    const yearOptions = ['2566', '2565', '2564']
    const courseOptions = [
        'เทคโนโลยีสารสนเทศ',
        'วิทยาการข้อมูลและการวิเคราะห์เชิงธุรกิจ',
        'เทคโนโลยีสารสนเทศทางธุรกิจ (หลักสูตรนานาชาติ)',
        'เทคโนโลยีปัญญาประดิษฐ์'
    ]

    function search(formData) {
        console.log("Search");
    }

    return (
        <form className="w-[65%] max-2xl:w-[75%] mt-10 max-2xl:mt-2 h-auto p-12 max-2xl:p-8 bg-white border border-gray-200 rounded-[30px]"
            action={search}
        >
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase text-[16px] max-2xl:text-[14px] mb-2" htmlFor="year">
                        ปีการศึกษา
                    </label>
                    <select
                        className='bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500'
                        name="selectedYear">
                        {yearOptions.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase text-[16px] max-2xl:text-[14px] mb-2" htmlFor="semester">
                        ภาคการศึกษา
                    </label>
                    <select
                        className='bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500'
                        name="selectedSemester">
                        <option value="semester1">ภาคเรียนที่ 1</option>
                        <option value="semester2">ภาคเรียนที่ 2</option>
                    </select>
                </div>
                <div className="w-full px-3 mt-5 max-2xl:mt-3">
                    <label className="block uppercase text-[16px] max-2xl:text-[14px] mb-2" htmlFor="faculty">
                        คณะ
                    </label>
                    <select
                        className='bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500'
                        name="selectedFaculty"
                        disabled>
                        <option value="it">คณะเทคโนโลยีสารสนเทศ</option>
                    </select>
                </div>
                <div className="w-full px-3 mt-5 max-2xl:mt-3">
                    <label className="block uppercase text-[16px] max-2xl:text-[14px] mb-2" htmlFor="department">
                        ภาควิชา
                    </label>
                    <select
                        className='bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500'
                        name="selectedDepartment"
                        disabled>
                        <option value="it">คณะเทคโนโลยีสารสนเทศ</option>
                    </select>
                </div>
                <div className="w-full px-3 mt-5 max-2xl:mt-3">
                    <label className="block uppercase text-[16px] max-2xl:text-[14px] mb-2" htmlFor="cooperative">
                        สหกิจ / ไม่สหกิจ
                    </label>
                    <select
                        className='bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500'
                        name="selectedCooperative">
                        <option value="cooperative">สหกิจ</option>
                        <option value="noCooperative">ไม่สหกิจ</option>
                    </select>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-5">
                    <label className="block uppercase text-[16px] max-2xl:text-[14px] mb-2" htmlFor="course">
                        หลักสูตร
                    </label>
                    <select
                        className='bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500'
                        name="selectedCourse">
                        {courseOptions.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-5">
                    <label className="block uppercase text-[16px] max-2xl:text-[14px] mb-2" htmlFor="yearStudy">
                        ชั้นปี
                    </label>
                    <select
                        className='bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500'
                        name="selectedYearStudy">
                        <option value="yesr1">1</option>
                        <option value="year2">2</option>
                        <option value="year3">3</option>
                        <option value="year4">4</option>
                    </select>
                </div>
            </div>
            <div className='px-3 mt-8 max-2xl:mt-5'>
                <button
                    className='py-2 tracking-[1px] rounded-[10px] text-white text-[16px] max-2xl:text-[15px] uppercase w-full bg-gradient-to-br from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%]'
                    type="submit"
                    onClick={() => { navigate('/studyPlan/result'); }}
                >
                    Search
                </button>
            </div>
        </form>
    )
}

export default StudyPlanForm
