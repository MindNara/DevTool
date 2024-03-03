import React, { useState, useEffect } from 'react'
import { Icon } from "@iconify/react";
import { collection, addDoc, query, where, getDocs, doc, deleteDoc, updateDoc, arrayUnion, getDoc, arrayRemove, onSnapshot } from "firebase/firestore";
import { db } from '../../config/firebase';

function CommentInput({ userId, postId, role }) {

  const [commentDetail, setCommentDetail] = useState("")

  // Create Comment
  const createComment = async () => {
    const timestamp = new Date();
    console.log(timestamp)
    try {
      const CommentRef = await addDoc(collection(db, "comment"), {
        message: commentDetail,
        post_id: postId,
        timestamp: timestamp,
        user_id: userId
      });
      console.log("msg >> ", commentDetail)
      setCommentDetail("");
      console.log("msg >> ", commentDetail)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div name="post" className="relative mx-2">
      <input
        value={commentDetail}
        className="w-full h-[40px] rounded-[10px] border-0 py-5 pl-7 pr-20 text-[16px] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-[#0D0B5F] text-sm font-light "
        placeholder="Your Message ..."
        onChange={(e) => setCommentDetail(e.target.value)}
      ></input>
      <button onClick={createComment} className="py-[6px] px-[12px] rounded-[10px] flex-shrink-0 bg-gradient-to-br from-[#0D0B5F] to-[#029BE0] hover:from-[#029BE0] hover:to-[#0D0B5F] rounded-[10px] absolute top-1/2 right-[-6px] transform -translate-x-1/2 -translate-y-1/2 text-[16px]">
        <Icon icon="wpf:sent" color="#fff" className="py-0.1" />
      </button>
    </div>
  );
}

export default CommentInput;
