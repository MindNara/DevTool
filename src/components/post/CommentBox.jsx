import React from "react";
import { Link } from "react-router-dom";

const DetailCommentBox = [
  {
    name: "Himawari",
    time: "5.20 PM",
    commentmg: "น่าสนใจค่ะะะะะะะะ",
  },
  {
    name: "Kasama",
    time: "5.58 PM",
    commentmg: "เธอๆ ข้างบนอ่ะ ขอเบอร์ได้มุ้ยอ่าาาาาาาาา",
  },
];

const CommentBox = () => {
  const MAX_DESCRIPTION_LENGTH = 60;

  return (
    <div className="mt-5 relative">
      {DetailCommentBox.map((comment, index) => (
        <div key={index} className="flex items-start mb-4">
          <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#151C38] flex items-center justify-center text-white font-bold"></div>
          <div className="ml-3  items-start  p-2 rounded-[15px] bg-[#E3F3FF] relative">
            <div className="flex items-center mb-1">
              <p className="text-[#151C38] text-sm font-[400]">{comment.name}</p>
              <p className="text-[#A4A4A4] text-xs font-[350] ml-2">{comment.time}</p>
            </div>
            <p className="text-black text-sm font-light">{comment.commentmg}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentBox;
