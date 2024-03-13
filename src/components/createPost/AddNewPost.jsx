import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../config/firebase';


const AddNewPost = ({ userId }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalToggle = () => {
    setModalVisible(!modalVisible);
  };

  const [postTitle, setPostTitle] = useState("")
  const [postDescription, setPostDescription] = useState("");
  const [postImages, setPostImages] = useState([])

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
  }

  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);


  const handlePost = async (command) => {
    if (command === 'post') {
      // ตรวจสอบค่าว่างของ NewTitle และ Detail
      if (postTitle.trim() === '' || postDescription.trim() === '') {
        setTitleError(postTitle.trim() === '');
        setDescriptionError(postDescription.trim() === '');
        return; // ไม่ทำการ Post ถ้า NewTitle หรือ Detail ว่าง
      }
  
      // ทำงานที่ต้องการเมื่อผู้ใช้กด Accept
      const timestamp = new Date();
      try {
        const PostRef = await addDoc(collection(db, "post"), {
          title: postTitle,
          detail: postDescription,
          image: postImages,
          like: [],
          timestamp: timestamp,
          user_id: userId
        });
      }
      catch (error) {
        console.log(error);
      }
    }
    // Reset ค่า validation เมื่อผู้ใช้ปิด Modal หรือกด Post สำเร็จ
    setTitleError(false);
    setDescriptionError(false);
    setPostImages([]);
    setPostDescription('');
    setPostTitle('');
    setModalVisible(false); // ปิด Modal
  };
  


  return (
    <div className="flex-shrink-0 bg-white border-[2px] border-solid border-gray-300 rounded-[20px] p-4 relative">
      <p className="text-[#A4A4A4] text-l font-[350] ml-2">Add new post ...</p>

      <button
        onClick={handleModalToggle}
        className="w-[40px] h-[40px] flex-shrink-0 bg-gradient-to-br from-[#0D0B5F] to-[#029BE0] hover:from-[#029BE0] hover:to-[#0D0B5F] rounded-[15px] absolute top-1/2 right-[-6px] transform -translate-x-1/2 -translate-y-1/2"
        type="button"
        style={{
          border: "none",
          outline: "none",
          zIndex: modalVisible ? 1000 : 1,
        }}
      >
        <Icon
          icon="charm:plus"
          style={{ fontSize: "20px", color: "#fff", margin: "auto" }}
        />
      </button>

      {modalVisible && (
        <div
          id="default-modal"
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
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            {/* Pop up */}
            <div className="inline-block align-bottom bg-white rounded-[20px] text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white rounded-[30px]">
                <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 rounded-t">
                  <h5 className="text-[27px] font-semibold bg-gradient-to-br from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%] inline-block text-transparent bg-clip-text text-center w-full">
                    Create Post
                  </h5>

                  <button
                    type="button"
                    onClick={() => handlePost()}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-300 hover:text-white"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div className="p-4 md:p-5 space-y-4">
                  <input
                    type="text"
                    placeholder="New Title"
                    className={`border-none outline-none p-2 w-full focus:ring-0 text-xl font-semibold ${titleError ? 'border-red-500' : ''
                      }`}
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                  />
                  {titleError && <p className="text-red-500 ml-2 text-sm">Please enter a title</p>}
                  <textarea
                    rows="4"
                    cols="50"
                    placeholder="Text to something ..."
                    className={`border-none outline-none p-2 mb-4 w-full resize-none focus:ring-0 text-base font-normal ${descriptionError ? 'border-red-500' : ''
                      }`}
                    value={postDescription}
                    onChange={(e) => setPostDescription(e.target.value)}
                  />
                  {descriptionError && <p className="text-red-500 ml-2 text-sm">Please enter a message</p>}
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

                <div className="flex items-center p-4 md:p-5 rounded-b mt-[20px]">
                  <button
                    onClick={() => handlePost('post')}
                    type="button"
                    className="text-white bg-gradient-to-br from-[#0D0B5F] to-[#029BE0] hover:from-[#029BE0] hover:to-[#0D0B5F] font-medium rounded-lg text-[15px] px-10 py-2 text-center w-full"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewPost;
