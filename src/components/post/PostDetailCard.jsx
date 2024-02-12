import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "./PostDetailCard.css";
import { Carousel } from "@material-tailwind/react";
import DropdownDots from "./DropdownDots";
import CommentBox from "./CommentBox";
import CommentInput from "./CommentInput";
import { parse, compareDesc } from "date-fns";


const DetailCard = [
  {
    titlename: "Admission dek63",
    name: "Punimmiki",
    date: "21/12/2023",
    time: "08.20",
    message:
      "คณะเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง เปิดรับสมัครเข้าศึกษาต่อระดับปริญญาตรี ประจำปีการศึกษา 2563 TCAS 63 รอบที่ 4 (Admission) 2 หลักสูตร 1) เทคโนโลยีสารสนเทศ (Information Technology : IT) รับจำนวน 15 คน 2) ข้อมูลและการวิเคราะห์เชิงธุรกิจ (Data Science and Business Analytics : DSBA) รับจำนวน 6 คน ยกเลิกการสอบสัมภาษณ์ เนื่องจากสถานการณ์เชื้อ COVID -19 ระบาด",
    image: [
      "https://www.it.kmitl.ac.th/wp-content/uploads/2020/05/1300x867pix-%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%AA%E0%B8%A1%E0%B8%B1%E0%B8%84%E0%B8%A3-TCAS63-4-Admission.jpg",
      "https://osda.kmitl.ac.th/storage/cover_image/qecgcbzJO7u35tV60AAcF5ihBI3M2n8wIJcVVlcb.jpeg","https://www.aad.kmitl.ac.th/wp-content/uploads/2021/12/20211203-913x547.jpg",
      "https://www.aad.kmitl.ac.th/wp-content/uploads/2019/02/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%AA%E0%B8%A1%E0%B8%B1%E0%B8%84%E0%B8%A3-%E0%B9%82%E0%B8%97-%E0%B9%80%E0%B8%AD%E0%B8%81.jpg",
    ],
    like: 145,
    comment: 76,
  },
  {
    titlename: "ชำระค่าเทอม",
    name: "Punimmiki",
    date: "21/12/2023",
    time: "06.30",
    message: 
      "ขั้นตอนการพิมพ์ใบชำระค่าธรรมเนียมการศึกษา นักศึกษาทุกชั้นปี (ป.ตรี/โท/เอก) สามารถพิมพ์ใบแจ้งชําระเงินจากระบบ แล้วนําไปยื่นชําระเงินผ่านเคาท์เตอร์ธนาคาร (หรือในนักศึกษาระดับป.ตรี สแกนบาร์โค้ดผ่านแอพธนาคาร) โดยไม่มีค่าปรับชำระเงินล่าช้า จนถึงวันศุกร์ที่ 7 พฤษภาคม 2564",
    image: ["https://engineer.kmitl.ac.th/wp-content/uploads/2021/08/4-4.jpg"],
    like: 235,
    comment: 91,
  },
  {
    titlename: "ประกาศปิดวันหยุด",
    name: "Punimmiki",
    date: "28/12/2023",
    time: "18.12",
    message:
      "ขั้นตอนการพิมพ์ใบชำระค่าธรรมเนียมการศึกษา นักศึกษาทุกชั้นปี (ป.ตรี/โท/เอก) สามารถพิมพ์ใบแจ้งชําระเงินจากระบบ แล้วนําไปยื่นชําระเงินผ่านเคาท์เตอร์ธนาคาร (หรือในนักศึกษาระดับป.ตรี สแกนบาร์โค้ดผ่านแอพธนาคาร) โดยไม่มีค่าปรับชำระเงินล่าช้า จนถึงวันศุกร์ที่ 7 พฤษภาคม 2564",
    image: [],
    like: 57,
    comment: 2,
  },
  {
    titlename: "สอบกลางภาค",
    name: "Punimmiki",
    date: "19/12/2023",
    time: "12.12",
    message:
      "สอบปลายภาคเป็นการสรุปว่าคุณเรียนตลอดทั้งปีได้อะไรบ้าง สอบกลางภาคบทเรียนที่คุณเรียนไปแล้วกลางเทอมว่าได้ความรู้",
    image: [],
    like: 57,
    comment: 2,
  },
];

const PostDetailCard = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [imgForFullScreen, setImgForFullScreen] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showComments, setShowComments] = useState([]);

  const sortedDetailCard = DetailCard.slice().sort((a, b) => {
    const dateTimeA = parse(`${a.date} ${a.time}`, "dd/MM/yyyy HH.mm", new Date());
    const dateTimeB = parse(`${b.date} ${b.time}`, "dd/MM/yyyy HH.mm", new Date());
    return compareDesc(dateTimeA, dateTimeB);
  });

  const handleLikeClick = (index) => {
    if (likedPosts.includes(index)) {
      setLikedPosts(likedPosts.filter((i) => i !== index));
    } else {
      setLikedPosts([...likedPosts, index]);
    }
  };

  const handleImageClick = (item, index) => {
    setImgForFullScreen(item);
    setCurrentImageIndex(index);
    setShowFullScreen(true);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % DetailCard.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + DetailCard.length) % DetailCard.length
    );
  };

  const handleCloseFullScreen = () => {
    setShowFullScreen(false);
  };

  const handleToggleComments = (index) => {
    setShowComments((prev) => {
      const newShowComments = [...prev];
      newShowComments[index] = !newShowComments[index];
      return newShowComments;
    });
  };


  return (
    <div className="mt-5">
     {sortedDetailCard.map((detail, index) => (
        <div key={index} className="mt-4">
          <div className="flex-shrink-0 border-[1px] border-solid border-gray-300 rounded-[30px] p-6 bg-white">
            <div className="text-[#151C38] text-2xl font-[500] leading-normal flex justify-between">
              <span>{detail.titlename}</span>
              <DropdownDots />
            </div>

            <div className="mt-5 flex items-start">
              <div className="w-[50px] h-[50px] flex-shrink-0 rounded-full bg-[#151C38]"></div>
              <div className="ml-4">
                <p className="text-[#151C38] text-l font-[400]">
                  {detail.name}
                </p>
                <p className="text-[#A4A4A4] text-l font-[350]">
                  {detail.date}, {detail.time} น.
                </p>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-black text-l font-light">{detail.message}</p>

              {detail.image.length === 1 ? (
                <img
                  src={detail.image[0]}
                  className="object-cover w-full rounded-lg cursor-pointer"
                  alt={`post-${index}`}
                  onClick={() => handleImageClick(detail.image[0], index)}
                />
              ) : (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {detail.image.slice(0, 4).map((item, i) => (
                    <div key={i}>
                      <img
                        src={item}
                        className="object-cover w-full h-44 rounded-lg cursor-pointer"
                        alt={`post-${index}-${i}`}
                        onClick={() => handleImageClick(item, index)}
                      />
                    </div>
                  ))}
                  {detail.image.length > 4 && (
                    <div
                      className="object-cover w-full h-44 rounded-lg cursor-pointer"
                      onClick={() => handleImageClick(detail.image[4], index)}
                    >
                      <p className="text-white text-lg font-bold">
                        +{detail.image.length - 4}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {showFullScreen && (
                <div
                  className="fullscreen-overlay active"
                  onClick={handleCloseFullScreen}
                >
                  <div className="fullscreen-image">
                    <Icon
                      icon="fluent:chevron-left-24-filled"
                      color="white"
                      width="32"
                      height="32"
                      className="absolute top-1/2 left-4 cursor-pointer"
                      onClick={handlePrevImage}
                    />
                    <img
                      className="centered-image"
                      src={imgForFullScreen}
                      alt="Full Screen"
                    />
                    <Icon
                      icon="fluent:chevron-right-24-filled"
                      color="white"
                      width="32"
                      height="32"
                      className="absolute top-1/2 right-4 cursor-pointer"
                      onClick={handleNextImage}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3 flex items-start">
              <Icon
                icon={likedPosts.includes(index) ? "bxs:heart" : "bx:heart"}
                color={likedPosts.includes(index) ? "#d91818" : "#151c38"}
                width="22"
                height="22"
                onClick={() => handleLikeClick(index)}
              />
              <div className="ml-1 mt-[1px]">
                <p className="text-[#151C38] text-sm mr-3">{detail.like}</p>
              </div>
              <div className="mt-[1px]">
              <Icon
                 icon={showComments[index] ? "iconamoon:comment-fill" : "iconamoon:comment"}
                color="#151c38"
                width="20"
                height="20"
                onClick={() => handleToggleComments(index)}
              />
            </div>
              <div className="ml-1 mt-[1px]">
                <p className="text-[#151C38] text-sm">{detail.comment}</p>
              </div>
            </div>
            {showComments[index] && ( 
            <div>
              <CommentBox />
              <CommentInput />
            </div>
          )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostDetailCard;