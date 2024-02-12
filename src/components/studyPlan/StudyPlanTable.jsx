import React from 'react'
import { StudyPlanData } from '../../dummyData/StudyPlanData'
import { Card, Typography } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

function StudyPlanTable() {

    const tableHead = ["รหัสวิชา", "ชื่อวิชา", "หน่วยกิต"];

    return (
        <>
            {StudyPlanData.map(({ courses, yearStudy, semester, year, subjects }, index) => (
                <div className='w-full'>
                    <div className='flex justify-center mt-3 max-2xl:mt-4 mb-8 max-2xl:mb-5 tracking-[1px]'>
                        <h1 className='text-[24px] max-2xl:text-[20px] font-semibold'>{courses}, ชั้นปีที่ {yearStudy}, {semester}/{year}</h1>
                    </div>
                    <Card className="h-full w-full rounded-[30px]">
                        <table className="w-full min-w-max table-auto text-center">
                            <thead>
                                <tr>
                                    {tableHead.map((head) => (
                                        <th
                                            key={head}
                                            className="border-b border-r border-gray-200 bg-blue-gray-50 p-3"
                                        >
                                            <Typography
                                                color="black"
                                                className="leading-none font-semibold text-[20px] max-2xl:text-[16px] tracking-[1px]"
                                            >
                                                {head === "หน่วยกิต" ? (
                                                    <>
                                                        {head} <br />(ทฤษฎี - ปฎิบัติ - ค้นคว้า)
                                                    </>
                                                ) : (
                                                    head
                                                )}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {subjects.map(({ subjectId, thaiSubjectsName, engSubjectsName, credit }, index) => {
                                    const isLast = index === subjects.length - 1;
                                    const classes = isLast ? "p-5 border-r" : "p-5 border-b border-r border-gray-200";
                                    const textClass = "font-medium text-[20px] max-2xl:text-[16px] tracking-[1px]";
                                    const titleClass = "font-semibold text-[20px] max-2xl:text-[16px] tracking-[1px] bg-gradient-to-br from-[#0D0B5F] to-[#029BE0] text-transparent bg-clip-text";

                                    return (
                                        <>
                                            <tr>
                                                <td className={`${classes} w-[25%]`}>
                                                    <Typography
                                                        color="black"
                                                        className={textClass}
                                                    >
                                                        {subjectId}
                                                    </Typography>
                                                </td>
                                                <td className={`${classes}`}>
                                                    <Link to={`/review/${subjectId}`}>
                                                        <Typography
                                                            color="black"
                                                            className={`${titleClass}`}
                                                        >
                                                            {thaiSubjectsName}
                                                        </Typography>
                                                        <Typography
                                                            color="black"
                                                            className={`${titleClass} uppercase`}
                                                        >
                                                            {engSubjectsName}
                                                        </Typography>
                                                    </Link>
                                                </td>
                                                <td className={`${classes} w-[25%]`}>
                                                    <Typography
                                                        color="black"
                                                        className={textClass}
                                                    >
                                                        {credit}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        </>
                                    );
                                })}

                            </tbody>
                        </table>
                    </Card>
                </div>
            ))}
            {/* {StudyPlanData.map((item, index) => (
                <div>

                </div>
            ))} */}
        </>
    )
}

export default StudyPlanTable