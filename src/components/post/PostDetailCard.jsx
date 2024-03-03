import React, { useState, useEffect } from 'react'
import { Icon } from "@iconify/react";
import "./PostDetailCard.css";
import { Carousel } from "@material-tailwind/react";
import DropdownDots from "./DropdownDots";
import CommentBox from "./CommentBox";
import CommentInput from "./CommentInput";
import { parse, compareDesc } from "date-fns";
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc, arrayUnion, getDoc, arrayRemove, onSnapshot } from "firebase/firestore";
import { db, auth } from '../../config/firebase';

const PostDetailCard = ({ userId, role }) => {
  const [detailCard, setDetailCard] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});

  useEffect(() => {
    const docRef = collection(db, "post");
    // onSnapshot = ติดตามการเปลี่ยนแปลงในข้อมูลในคอลเล็กชัน "post" 
    const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
      const subjectDocs = [];
      querySnapshot.forEach((doc) => {
        subjectDocs.push({ ...doc.data(), id: doc.id });
      });
      // เรียงลำดับโพสต์ตามเวลาล่าสุด
      subjectDocs.sort((a, b) => b.timestamp - a.timestamp);
      console.log("Look posts >>> ", subjectDocs);
      setDetailCard([...subjectDocs]);
    }, (error) => {
      console.error("Error fetching post:", error);
    });

    return unsubscribe;
  }, []);

  // เมื่อคอมโพเนนต์เริ่มต้น ตรวจสอบสถานะการกดไลค์ของแต่ละโพสต์
  useEffect(() => {
    const initialLikedPosts = {};
    detailCard.forEach(post => {
      //ถ้า Post ไหนมี userCurrent 'กดหัวใจ' จะมีค่าเป็น true
      //โดยจะเก็บ postId และ boolean
      initialLikedPosts[post.id] = post.like.includes(userId);
    });
    setLikedPosts(initialLikedPosts);
  }, [detailCard]); //โดยดูการเปลี่ยนแปลงของ detailcard

  // function แปลงเวลา timestamp 
  const convertTimestampToTime = (timestamp) => {
    // Convert Firestore Timestamp to JavaScript Date object
    const date = timestamp.toDate();

    // Format the date and time
    const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formattedTime = date.toLocaleString('en-US', options); // สามารถเปลี่ยน 'th-TH' เป็นสำหรับภาษาและพื้นที่ที่ต้องการได้

    return formattedTime;
  };

  // กดหัวใจ
  const handleLikeClick = async (postId) => {
    // console.log(postId)
    // console.log(userId)
    const documentRef = doc(db, 'post', postId);
    try {
      const docSnapshot = await getDoc(documentRef);
      if (docSnapshot.exists()) {
        const postData = docSnapshot.data();
        const likeArray = postData.like || []; // ใช้ [] เพื่อรับค่า null หรือ undefined ได้
        const updatedLikeArray = likeArray.includes(userId) ? arrayRemove(userId) : arrayUnion(userId);

        await updateDoc(documentRef, { like: updatedLikeArray });
        console.log("Like status updated in Firestore!");
      }
    } catch (error) {
      console.error("Error updating like in Firestore: ", error);
    }
  };




  const [showFullScreen, setShowFullScreen] = useState(false);
  const [imgForFullScreen, setImgForFullScreen] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showComments, setShowComments] = useState([]);

  // const sortedDetailCard = detailCard.slice().sort((a, b) => {
  //   const dateTimeA = parse(`${a.date} ${a.time}`, "dd/MM/yyyy HH.mm", new Date());
  //   const dateTimeB = parse(`${b.date} ${b.time}`, "dd/MM/yyyy HH.mm", new Date());
  //   return compareDesc(dateTimeA, dateTimeB);
  // });

  const handleImageClick = (item, index) => {
    setImgForFullScreen(item);
    setCurrentImageIndex(index);
    setShowFullScreen(true);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % detailCard.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + DetailCard.length) % detailCard.length
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
      {detailCard.map((detail, index) => (
        <div key={index} className="mt-4">
          <div className="flex-shrink-0 border-[1px] border-solid border-gray-300 rounded-[30px] p-6 bg-white">
            <div className="text-[#151C38] text-2xl font-[500] leading-normal flex justify-between">
              <span>{detail.title}</span>
              <DropdownDots />
            </div>

            <div className="mt-5 flex items-start">
              <div className="w-[50px] h-[50px] flex-shrink-0 rounded-full bg-[#151C38]"></div>
              <div className="ml-4">
                <p className="text-[#151C38] text-l font-[400]">
                  {detail.user_id}
                </p>
                <p className="text-[#A4A4A4] text-l font-[350]">
                  {convertTimestampToTime(detail.timestamp)}
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
              <button>
                <Icon
                  icon={likedPosts[detail.id] ? "bxs:heart" : "bx:heart"}
                  color={likedPosts[detail.id] ? "#d91818" : "#151c38"}
                  width="22"
                  height="22"
                  onClick={() => handleLikeClick(detail.id)}
                />
              </button>
              <div className="ml-1 mt-[1px]">
                <p className="text-[#151C38] text-sm mr-3">{detail.like.length}</p>
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
                <CommentBox userId={userId} postId={detail.id} role={role} />
                <CommentInput userId={userId} postId={detail.id} role={role} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostDetailCard;