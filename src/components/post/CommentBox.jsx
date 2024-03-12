import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc, arrayUnion, getDoc, arrayRemove, onSnapshot } from "firebase/firestore";
import { db } from '../../config/firebase';

const CommentBox = ({ userId, postId, role }) => {
  const MAX_DESCRIPTION_LENGTH = 60;

  const [detailCommentBox, setDetailCommentBox] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "comment"), where("post_id", "==", postId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const subjectDocs = [];
      querySnapshot.forEach((doc) => {
        subjectDocs.push({ ...doc.data(), id: doc.id });
      });
      // เรียงลำดับโพสต์ตามเวลาล่าสุด
      // subjectDocs.sort((a, b) => b.timestamp - a.timestamp);
      console.log("Look comment >>> ", subjectDocs);
      setDetailCommentBox([...subjectDocs]);
    }, (error) => {
      console.error("Error fetching post:", error);
    });

    return unsubscribe;
  }, [postId]); // เพิ่ม postId เข้าไปใน dependency array เพื่อให้ useEffect เรียกใช้งานเมื่อ postId เปลี่ยนแปลง

  // function แปลงเวลา timestamp 
  const convertTimestampToTime = (timestamp) => {
    // Convert Firestore Timestamp to JavaScript Date object
    const date = timestamp.toDate();

    // Format the date and time
    const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formattedTime = date.toLocaleString('en-US', options); // สามารถเปลี่ยน 'th-TH' เป็นสำหรับภาษาและพื้นที่ที่ต้องการได้

    return formattedTime;
  };

  // แก้ไข Comment
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isMessage, setMessage] = useState("");
  const [cloneMessage, setCloneMessage] = useState("");

  const toggleModalEdit = async (comment) => {
    const currentDate = new Date();
    if (comment == "save") {
      try {
        await updateDoc(doc(db, "comment", cloneMessage.id), {
          message: isMessage,
          timestamp: currentDate
        });
        console.log("Comment updated successfully!", isMessage);
      } catch (error) {
        console.error("Error updating comment:", error);
      }
    }
    else {
      setMessage(comment.message)
      setCloneMessage(comment)
      setIsModalEditOpen(true)
    }
    setIsModalEditOpen(!isModalEditOpen);
  };

  // ลบ Comment
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [deletedCommentId, setdeletedCommentId] = useState("")

  const toggleModalDelete = async (command, commentId) => {

    if (command === 'X' || command === 'cancle') {
      setIsModalDeleteOpen(false);
    } else if (command === 'openModal') {
      setdeletedCommentId(commentId)
      setIsModalDeleteOpen(true);
    } else if (command === 'delete') {
      try {
        await deleteDoc(doc(db, "comment", deletedCommentId));
        console.log("Comment deleted successfully!");
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
      setIsModalDeleteOpen(false);
    }
  };

  return (
    <div className="mt-5 relative">
      {detailCommentBox.map((comment, index) => (
        <div key={index} className="flex items-start mb-4">
          <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#151C38] flex items-center justify-center text-white font-bold"></div>
          <div className="ml-3 p-2 bg-[#E3F3FF] relative" style={{ width: '100%', maxWidth: 'calc(100% - 40px)', borderRadius: '10px' }}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                {/* <p className="text-[#151C38] text-sm font-[400]">{comment.user_id}</p> */}
                <p className="text-[#151C38] text-sm font-[400]">{comment.user_id == "qaK3UESxESOfa2HWtTO1koATGku2" ? (<p>admin</p>) : (<p>Anonymous</p>)}</p>
                <p className="text-[#A4A4A4] text-[10px] font-[350] ml-2 mt-[2px]">{convertTimestampToTime(comment.timestamp)}</p>
              </div>
              <div className="relative">
                {role == "admin" || comment.user_id == userId ? (
                  <Menu placement="bottom-end">
                    <MenuHandler>
                      <div className="flex items-center cursor-pointer">
                        <Icon icon="prime:ellipsis-h" color="#151c38" width="15" height="15" />
                      </div>
                    </MenuHandler>
                    <MenuList className="bg-[#ffffff] border border-gray-200 shadow-md rounded-xl text-sm">
                      <MenuItem className="hover:bg-gray-200 cursor-pointer rounded-xl" onClick={() => toggleModalEdit(comment)}>
                        <div className="flex item-center py-3">
                          <Icon
                            icon="fluent:edit-24-regular"
                            color="#727272"
                            width="15"
                            height="15"
                          />
                          <span className="pl-3 text-gray-700">Edit Comment</span>
                        </div>
                      </MenuItem>
                      <MenuItem className="hover:bg-gray-200 cursor-pointer rounded-xl" onClick={() => toggleModalDelete('openModal', comment.id)}>
                        <div className="hover:bg-gray-200 cursor-pointer">
                          <div className="flex item-center py-3">
                            <Icon
                              icon="mingcute:delete-3-line"
                              color="#727272"
                              width="15"
                              height="15"
                            />
                            <p className="pl-3 text-gray-700">Delete Comment</p>
                          </div>
                        </div>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                ) : <></>}
              </div>
            </div>
            {isModalEditOpen && (
              <div
                id="modal-edit"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed inset-0 overflow-y-auto"
                style={{ zIndex: 1001, borderRadius: "30px" }}
              >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 bg-gray-500 opacity-25"></div>
                  </div>
                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <div className="inline-block align-bottom bg-white rounded-[20px] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white rounded-[30px]">
                      {/* header */}
                      <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h5 className="text-[27px] font-semibold bg-gradient-to-br from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%] text-transparent bg-clip-text text-center w-full">
                          Edit Comment
                        </h5>
                        {/* close */}
                        <button onClick={() => setIsModalEditOpen(false)} type="button" className="absolute top-5 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                          </svg>
                        </button>
                      </div>
                      {/* body */}
                      <div className="p-4 md:p-5 space-y-4">
                        <textarea
                          rows="4"
                          cols="50"
                          placeholder="Text to something ..."
                          className="border-none outline-none p-2 mb-4 w-full resize-none focus:ring-0 text-base font-normal"
                          value={isMessage}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                      {/* footer */}
                      <div className="flex items-center p-4 md:p-5 rounded-b mt-[-20px] mb-2">
                        <button
                          onClick={() => toggleModalEdit("save")}
                          type="button"
                          className="text-white bg-gradient-to-br from-[#0D0B5F] to-[#029BE0] hover:from-[#029BE0] hover:to-[#0D0B5F] font-medium rounded-lg text-lg px-10 py-2 text-center w-full"
                        >
                          SAVE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isModalDeleteOpen && (
              <div
                id="modal-delete"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed inset-0 overflow-y-auto"
                style={{ zIndex: 1001, borderRadius: "30px" }}
              >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 bg-gray-500 opacity-25"></div>
                  </div>

                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <div className="inline-block align-bottom bg-white rounded-[20px] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white rounded-[30px]">

                      {/* header */}
                      <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h5 className="text-[27px] font-semibold bg-gradient-to-br from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%] text-transparent bg-clip-text text-center w-full">
                          Delete Comment
                        </h5>
                        {/* close */}
                        <button onClick={() => toggleModalDelete('X')} type="button" class="absolute top-5 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                          </svg>
                        </button>
                      </div>
                      {/* body */}
                      <div className="flex flex-col p-4 md:p-5 justify-center items-center text-2xl font-normal">
                        <p>Are you sure you want to</p>
                        <p>delete your comment ?</p>
                      </div>
                      {/* footer */}
                      <div className="flex flex-row gap-4 mb-2 mt-6">
                        <div className="flex items-center pl-6 rounded-b mt-[-20px] mb-2 w-full">
                          <button
                            onClick={() => toggleModalDelete('cancle')}
                            type="button"
                            className="text-gray-500 bg-white hover:from-[#029BE0] hover:to-[#0D0B5F] font-medium rounded-lg text-lg px-10 py-2 text-center w-full border-2 border-[#D9D9D9]"
                          >
                            Canc
                          </button>
                        </div>
                        <div className="flex items-center pr-6 rounded-b mt-[-20px] mb-2 w-full">
                          <button
                            onClick={() => toggleModalDelete('delete')}
                            type="button"
                            className="text-white bg-gradient-to-br from-[#0D0B5F] to-[#029BE0] hover:from-[#029BE0] hover:to-[#0D0B5F] font-medium rounded-lg text-lg px-10 py-2 text-center w-full"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <p className="text-black text-sm font-light">{comment.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentBox;
