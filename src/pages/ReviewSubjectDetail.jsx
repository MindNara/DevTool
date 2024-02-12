import React, { useState } from 'react'
import CardDetailSubject from '../components/cardReview/CardDetailSubject'
import CardReview from '../components/cardReview/CardReview'
import QuestionCard from '../components/question/QuestionCard'
import { Outlet, useLocation, Link, useParams } from 'react-router-dom'
import QuestionDetail from '../dummyData/QuestionDetail'

function ReviewSubjectDetail() {
  let { reviewId } = useParams();
  console.log(reviewId)
  const [activeTab, setActiveTab] = useState("review")

  // Modal create open
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const toggleModalCreate = () => {
    setIsModalCreateOpen(!isModalCreateOpen);
  };
  console.log(isModalCreateOpen)

  // แสดงตัวตน ปัจจุบัน
  const user = "Anonymous1";
  // import data จาก QuestionDetail
  const [database, setDatabase] = useState(QuestionDetail);

  // เพิ่มข้อมูลลงฐานข้อมูล
  const [question, setQuestion] = useState('');
  const postQuestion = () => {
    const currentDate = new Date();
    const newQuestion = {
      id: database[database.length - 1].id + 1,
      name: user,
      date: `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()+543}`,
      time: currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      detail: question,
      like: [],
      dislike: [],
      answer: []
    };
    // เอาข้อมูลเก่า + ข้อมูลใหม่
    const newDatabase = [...database, newQuestion];
    // Update the state with the new array
    setDatabase(newDatabase);
    setQuestion('')
  }

  return (
    <div className='w-full'>
      {/* ReviewDetail */}
      <div name="ReviewDetail">
        <CardDetailSubject id={reviewId} />
      </div>

      {/* ReviewOrQuestion */}
      <div name="ReviewOrQuestion">
        <div className='h-[48dvh] mt-4'>
          <div name='btnReviewOrQuestion'>
            <button
              onClick={() => setActiveTab("review")}
              className={`${activeTab === "review" ? "border-[#151C38] text-[#151C38] font-medium text-lg" : "border-[#00000020] text-[#00000020] font-medium text-lg"} border-b-4 px-5`}>
              Review
            </button>
            <button
              onClick={() => setActiveTab("question")}
              className={`${activeTab === "question" ? "border-[#151C38] text-[#151C38] font-medium text-lg" : "border-[#00000020] text-[#00000020] font-medium text-lg"} border-b-4 px-5`}>
              Question
            </button>
          </div>
          <div className='h-full' >
            {activeTab === "review" &&
              <div>
                <div className="w-full mt-4 border-2 rounded-[30px] bg-[#ffffff] p-[20px]">
                  {/* สร้างรีวิว */}
                  <div className='inputReview flex flex-row gap-3 drop-shadow-sm'>
                    <input type='text' name='review' placeholder='Add review ...' className='w-full h-[50px] font-light pr-[65px]' onClick={toggleModalCreate} readOnly></input>
                    <button
                      className="py-[6px] px-[12px] rounded-[10px] bg-gradient-to-br 
                    from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%] text-[#ffffff]  
                    hover:from-[#029BE0] hover:to-[#0D0B5F]
                    absolute right-2 mt-[6px] text-[16px] w-[40px] h-[40px]" onClick={toggleModalCreate}
                    >
                      <img src='https://img.icons8.com/ios-filled/20/FFFFFF/plus-math.png'></img>
                    </button>
                  </div>
                  <CardReview id={reviewId} />
                  
                  {/* Modal create Review */}
                  {isModalCreateOpen && (
                    <div
                      id="modal-create"
                      tabIndex="-1"
                      aria-hidden="true"
                      className="fixed inset-0 overflow-y-auto"
                      style={{ zIndex: 1001, borderRadius: "30px" }}
                    // onClick={() => setIsModalOpen(false)}
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
                                Create Review
                              </h5>
                              {/* close */}
                              <button type="button" className="absolute top-5 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsModalCreateOpen(false)}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                              </button>
                            </div>
                            {/* body */}
                            <div className="p-4 md:p-5 space-y-4">
                              <textarea
                                rows="4"
                                cols="50"
                                placeholder="Text something review ..."
                                className="border-none outline-none p-2 mb-4 w-full resize-none focus:ring-0 text-base font-normal"
                              // value="eiei"
                              />
                            </div>
                            <div className="flex flex-row">
                              <div className="w-full px-3 mb-6">
                                <label className="text-[16px] max-2xl:text-[16px] font-medium mb-2 text-gray-500" htmlFor="year">
                                  Rating
                                </label>
                                <select
                                  className='bg-[#F4F4F4] border border-gray-200 rounded-[10px] text-gray-500 mt-2 text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500'
                                  name="selectedPoint">
                                  <option value="1">1 point</option>
                                  <option value="2">2 point</option>
                                  <option value="3">3 point</option>
                                  <option value="4">4 point</option>
                                  <option value="5">5 point</option>

                                </select>
                              </div>
                              <div className="w-full px-3 mb-6">
                                <label className="text-[16px] max-2xl:text-[16px] font-medium mb-2 text-gray-500" htmlFor="year">
                                  Grade
                                </label>
                                <select
                                  className='bg-[#F4F4F4] border border-gray-200 text-gray-500 rounded-[10px] mt-2 text-[16px] max-2xl:text-[15px] w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500'
                                  name="selectedGrade">
                                  <option value="A">A</option>
                                  <option value="B+">B+</option>
                                  <option value="B">B</option>
                                  <option value="C+">C+</option>
                                  <option value="C">C</option>
                                  <option value="D+">D+</option>
                                  <option value="D">D</option>
                                </select>
                              </div>
                            </div>
                            {/* footer */}
                            <div className="flex items-center p-4 md:p-5 rounded-b mt-[-20px] mb-2">
                              <button
                                onClick={() => setIsModalCreateOpen(false)}
                                type="button"
                                className="text-white bg-gradient-to-br from-[#0D0B5F] to-[#029BE0] hover:from-[#029BE0] hover:to-[#0D0B5F] font-medium rounded-lg text-lg px-10 py-2 text-center w-full"
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
              </div>}
            {activeTab === "question" &&
              <div className="w-full mt-4 border-2 rounded-[30px] bg-[#ffffff] p-[20px]">
                {/* สร้างคำถาม */}
                <div className='inputReview flex flex-row gap-3 drop-shadow-sm'>
                  <input type='text' placeholder="Question" className="w-full h-[50px] font-light pr-[80px]"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}>
                  </input>
                  <button
                    className="py-[6px] px-[12px] rounded-[10px] bg-gradient-to-br 
                    from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%] text-[#ffffff]  
                    hover:from-[#029BE0] hover:to-[#0D0B5F]
                    absolute right-2 top-2 text-[16px]"
                    onClick={postQuestion}
                  >
                    POST
                  </button>
                </div>

                {/* QuestionCard */}
                <QuestionCard database={database} setDatabase={setDatabase} user={user}/>
              </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewSubjectDetail