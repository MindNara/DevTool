import React from "react";

const DetailCard = [
    {
        titlename: "Admission dek63",
        name: "Punimmiki",
        date: "17/12/2023",
        time: "5.20 PM",
        message:
            "คณะเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง เปิดรับสมัครเข้าศึกษาต่อระดับปริญญาตรี ประจำปีการศึกษา 2563 TCAS 63 รอบที่ 4 (Admission) 2 หลักสูตร 1) เทคโนโลยีสารสนเทศ (Information Technology : IT) รับจำนวน 15 คน 2) ข้อมูลและการวิเคราะห์เชิงธุรกิจ (Data Science and Business Analytics : DSBA) รับจำนวน 6 คน ยกเลิกการสอบสัมภาษณ์ เนื่องจากสถานการณ์เชื้อ COVID -19 ระบาด",
        image: ["https://www.it.kmitl.ac.th/wp-content/uploads/2020/05/1300x867pix-%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%AA%E0%B8%A1%E0%B8%B1%E0%B8%84%E0%B8%A3-TCAS63-4-Admission.jpg", "https://osda.kmitl.ac.th/storage/cover_image/qecgcbzJO7u35tV60AAcF5ihBI3M2n8wIJcVVlcb.jpeg",],
        like: 145,
        comment: 76,
    },
    {
        titlename: "ชำระค่าเทอม",
        name: "Punimmiki",
        date: "18/12/2023",
        time: "6.30 AM",
        message:
            "ขั้นตอนการพิมพ์ใบชำระค่าธรรมเนียมการศึกษา นักศึกษาทุกชั้นปี (ป.ตรี/โท/เอก) สามารถพิมพ์ใบแจ้งชําระเงินจากระบบ แล้วนําไปยื่นชําระเงินผ่านเคาท์เตอร์ธนาคาร (หรือในนักศึกษาระดับป.ตรี สแกนบาร์โค้ดผ่านแอพธนาคาร) โดยไม่มีค่าปรับชำระเงินล่าช้า จนถึงวันศุกร์ที่ 7 พฤษภาคม 2564",
        image: "",
        like: 235,
        comment: 91,
    },
];

const CardAnnouncement = () => {
    return (
        <div>
            {DetailCard.map((detail, index) => (
                <div className="w-full p-2 mt-4 rounded-lg hover:border-[1px] hover:border-[#C0C0C0] hover:bg-white">
                    <div className='flex flex-row w-full'>
                        <div className='w-[120px] h-[65px] mt-1 bg-[#151C38] rounded-xl'></div>
                        <div className='pl-5 w-full'>
                            <h5 className='font-semibold text-sm tracking-tight text-[#151C38]'>{detail.titlename}</h5>
                            {detail.message.length > 50 ? (<p className="mb-3 font-light text-gray-500 text-xs">{detail.message.substring(0, 50)} ...</p>) : (<p className="mb-3 font-light text-gray-500 text-xs">{detail.message}</p>) }
                        
                        </div>
                        <p className="mb-3 w-[100px] text-right font-light text-xs text-gray-500">{detail.time}</p>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default CardAnnouncement;