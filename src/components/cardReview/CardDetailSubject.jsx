import React, { useState } from "react";

const ContentSubjectDetailCard = [
    {
        subjectId: "06016321",
        subjectName: "วิศวกรรมซอฟต์แวร์",
        subjectNameEn: "SOFTWARE ENGINEERING",
        subjectCredit: "3(3-0-6)",
        subjectType: "หมวดบังคับ",
        subjectContent: "ความรู้เบื้องต้นเกี่ยวกับวิศวกรรมซอฟต์แวร์ กลุ่มซอฟต์แวร์และแนวโน้มความเปลี่ยนแปลง กรอบงานของกระบวนการวิศวกรรมซอฟต์แวร์ กระบวนการพัฒนาซอฟต์แวร์แบบอไจล์ แม่แบบสำหรับการ ออกแบบ วิธีปฏิบัติด้านวิศวกรรมซอฟต์แวร์ สภาพแวดล้อมการพัฒนาซอฟต์แวร์โดยใช้เวอร์ชั่นคอนโทรล แบบจำลองวุฒิภาวะและความสามารถเชิงบูรณาการ (ซีเอ็มเอ็มไอ) วิศวกรรมความต้องการ วิศวกรรมการวิเคราะห์และออกแบบ ความรู้เบื้องต้นเกี่ยวกับการทดสอบซอฟต์แวร์ กระบวนการยูนิฟาย์ การประเมินกระบวนการ และแบบจำลองกระบวนการเชิงบัญญัติและเชิงวิวัฒน์"
    },
    {
        subjectId: "06016366",
        subjectName: "การประมวลผลภาพ",
        subjectNameEn: "IMAGE PROCESSING",
        subjectCredit: "3(3-0-6)",
        subjectType: "หมวดเสรีคณะ",
        subjectContent: "องค์ประกอบของระบบประมวลผลภาพ การสร้างภาพและรูปแบบการจัดเก็บข้อมูลภาพ เทคนิคพื้นฐานสำหรับการวิเคราะห์และประมวลผลข้อมูลภาพ การรับภาพ การแปลงภาพ การปรับปรุงภาพโดยใช้หลักการของเอ็นฮานสเม้นท์และรีสทอเรชัน การบีบอัดข้อมูลภาพ การวิเคราะห์ภาพ เช่น การตัดแยกวัตถุ การวัดคุณสมบัติของวัตถุในภาพ การวิเคราะห์ฟูเรีย"
    },
];

const CardDetailSubject = ({ id }) => {
    return (
        <div>
            {ContentSubjectDetailCard.map((detail, index) => (
                detail.subjectId === id && (
                    <div className="max-w p-6 bg-white border border-gray-200 rounded-xl" key={index}>
                        <div className="flex flex-row">
                            <h5 className="mb-2 text-xl font-bold text-[#151C38]">{detail.subjectId}</h5>
                            <div>
                                <h5 className="mb-2 text-xl font-bold text-[#151C38] ml-10">{detail.subjectNameEn} ({detail.subjectName})</h5>
                                <p className="ml-10 text-sm font-medium text-[#151C38]">{detail.subjectContent}</p>
                            </div>
                        </div>
                        <p className="mt-4 text-sm font-light text-[#151C38]">หน่วยกิต(ทฤษฎี - ปฎิบัติ - ค้นคว้า) {detail.subjectCredit}</p>
                    </div>
                )
            ))}
        </div>
    );
};

export default CardDetailSubject;
