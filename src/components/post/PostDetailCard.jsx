import React, { useState, useEffect } from 'react'
import { Icon } from "@iconify/react";
import "./PostDetailCard.css";
import { Carousel } from "@material-tailwind/react";
import CommentBox from "./CommentBox";
import CommentInput from "./CommentInput";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc, arrayUnion, getDoc, arrayRemove, onSnapshot } from "firebase/firestore";
import { db, auth } from '../../config/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
      (prevIndex) => (prevIndex - 1 + detailCard.length) % detailCard.length
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

  // Modal edit open
  const [postId, setPostId] = useState("")
  const [postTitle, setPostTitle] = useState("")
  const [postDescription, setPostDescription] = useState("");
  const [postImages, setPostImages] = useState([])

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const toggleModalEdit = (detail) => {
    setIsModalEditOpen(true);
    setPostId(detail.id)
    setPostTitle(detail.title)
    setPostDescription(detail.detail)
    setPostImages(detail.image)
  };

  const handleImageUpload = async (file) => {
    // Reference to the storage service
    const storage = getStorage();

    // Create a storage reference
    const storageRef = ref(storage, `images/${file.name}`);

    // Upload file to the storage reference
    const snapshot = await uploadBytes(storageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  };

  const handleAddImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const downloadURL = await handleImageUpload(file);
      setPostImages([...postImages, downloadURL]);
    }
  };

  const handleDeleteImage = (imageIndex) => {
    const updatedImages = [...postImages];
    updatedImages.splice(imageIndex, 1);
    setPostImages(updatedImages);
  };

  const toggleModalEditSave = async () => {
    const currentDate = new Date()
    try {
      await updateDoc(doc(db, "post", postId), {
        title: postTitle,
        detail: postDescription,
        image: postImages,
        timestamp: currentDate
      });
      console.log("Comment updated successfully!");
    } catch (error) {
      console.error("Error updating comment:", error);
    }
    setIsModalEditOpen(false);
  }

  // ลบ Post
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [deletedPostId, setdeletedPostId] = useState("")
  const toggleModalDelete = async (postId) => {
      setIsModalDeleteOpen(!isModalDeleteOpen);
      setdeletedPostId(postId)
    }


  const handleDeletePost = async () => {
    try {
      await deleteDoc(doc(db, "post", deletedPostId));
      console.log("Post has deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
    setIsModalDeleteOpen(!isModalDeleteOpen);
  }


  return (
    <div className="mt-5">
      {detailCard.map((detail, index) => (
        <div key={index} className="mt-4">
          <div className="flex-shrink-0 border-[1px] border-solid border-gray-300 rounded-[30px] p-6 bg-white">
            <div className="text-[#151C38] text-2xl font-[500] leading-normal flex justify-between">
              <span>{detail.title}</span>
              {/* <DropdownDots /> */}
              <div className="relative">
                {role == "admin" && (
                  <Menu placement="bottom-end">
                    <MenuHandler>
                      <div className="flex items-center cursor-pointer">
                        <Icon icon="prime:ellipsis-h" color="#151c38" width="22" height="22" />
                      </div>
                    </MenuHandler>
                    <MenuList className="bg-[#ffffff] border border-gray-200 shadow-md rounded-xl text-sm">
                      <MenuItem className="hover:bg-gray-200 cursor-pointer rounded-xl" onClick={() => toggleModalEdit(detail)}>
                        <div className="flex item-center py-3">
                          <Icon
                            icon="fluent:edit-24-regular"
                            color="#727272"
                            width="15"
                            height="15"
                          />
                          <span className="pl-3 text-gray-700">Edit Post</span>
                        </div>
                      </MenuItem>
                      <MenuItem className="hover:bg-gray-200 cursor-pointer rounded-xl" onClick={() => toggleModalDelete(detail.id)} >
                        <div className="flex item-center py-3">
                          <Icon
                            icon="mingcute:delete-3-line"
                            color="#727272"
                            width="15"
                            height="15"
                          />
                          <span className="pl-3 text-gray-700">Delete Post</span>
                        </div>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                )}
              </div>
            </div>

            {/* Modal edit Review */}
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
                          Edit Post
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
                        <input
                          type="text"
                          placeholder="New Title"
                          className="border-none outline-none p-2  w-full focus:ring-0 text-xl font-semibold"
                          value={postTitle}
                          onChange={(e) => setPostTitle(e.target.value)}
                        />
                        <textarea
                          rows="4"
                          cols="50"
                          placeholder="Text to something ..."
                          className="border-none outline-none p-2 mb-4 w-full resize-none focus:ring-0 text-base font-normal"
                          value={postDescription}
                          onChange={(e) => setPostDescription(e.target.value)}
                        />
                      </div>

                      <div className="flex items-center p-4 md:p-5 rounded-b mt-[-20px]">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAddImage}
                          id="image-upload"
                          className="hidden flex items-center text-gray-900 bg-white border border-gray-400 focus:outline-none hover:border-[#0D0B5F] font-normal rounded-lg text-sm px-5 py-2 me-2 mb-2"
                        />
                        <label
                          htmlFor="image-upload"
                          className="flex items-center text-gray-900 bg-white border border-gray-400 focus:outline-none hover:border-[#0D0B5F] font-normal rounded-lg text-sm px-5 py-2 me-2 mb-2 cursor-pointer"
                        >
                          Add image
                          <Icon
                            icon="ion:image-outline"
                            className="ms-2"
                            width="20"
                            height="20"
                          />
                        </label>
                      </div>

                      <div className="grid grid-cols-4 gap-1 content-center justify-items-center">
                        {postImages.length !== 0 &&
                          postImages.map((image, index) => (
                            <div key={index} className="bg-gray border rounded">
                              <img className="object-scale-down h-20 w-20" src={image} alt="uploaded" />
                              <button className="top-0 right-0 h-1 w-full" onClick={() => handleDeleteImage(index)}>
                                <span className="text-red-400 text-sm">Delete</span>
                              </button>
                            </div>
                          ))
                        }
                      </div>
                      {/* footer */}
                      <div className="flex items-center p-4 md:p-5 rounded-b mt-[20px] mb-2">
                        <button
                          onClick={() => toggleModalEditSave(postId)}
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

            {/* modal delete */}
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
                          Delete Post
                        </h5>
                        {/* close */}
                        <button onClick={() => toggleModalDelete()} type="button" className="absolute top-5 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                          </svg>
                        </button>
                      </div>
                      {/* body */}
                      <div className="flex flex-col p-4 md:p-5 justify-center items-center text-2xl font-normal">
                        <p>Are you sure you want to</p>
                        <p>delete your post?</p>
                      </div>
                      {/* footer */}
                      <div className="flex flex-row gap-4 mb-2 mt-6">
                        <div className="flex items-center pl-6 rounded-b mt-[-20px] mb-2 w-full">
                          <button
                            onClick={() => toggleModalDelete()}
                            type="button"
                            className="text-gray-500 bg-white hover:from-[#029BE0] hover:to-[#0D0B5F] font-medium rounded-lg text-lg px-10 py-2 text-center w-full border-2 border-[#D9D9D9]"
                          >
                            Cancel
                          </button>
                        </div>
                        <div className="flex items-center pr-6 rounded-b mt-[-20px] mb-2 w-full">
                          <button
                            onClick={() => handleDeletePost()}
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

            <div className="mt-5 flex items-start">
              <div className="w-[50px] h-[50px] flex-shrink-0 rounded-full bg-[#151C38]"></div>
              <div className="ml-4">
                <p className="text-[#151C38] text-l font-[400]">
                  Admin
                </p>
                <p className="text-[#A4A4A4] text-l font-[350]">
                  {convertTimestampToTime(detail.timestamp)}
                </p>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-black text-l font-light">{detail.detail}</p>

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