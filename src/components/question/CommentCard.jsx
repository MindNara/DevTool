import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";

function CommentCard({ data, indexQuestion, questionId, toggleCommentQuestion, user, database, setDatabase }) {
    const [showMore, setShowmore] = useState([]);
    const toggleShowmore = (answerId) => {
        const indexAnswer = data.answer.findIndex(answer => answer.id === answerId)
        setShowmore((prevIndex) => {
            const newOpenComments = [...prevIndex];
            newOpenComments[indexAnswer] = !newOpenComments[indexAnswer];
            return newOpenComments
        });
    };

    //ให้แสดง show less/show more โดยปรับตามขนาดจอ
    const [thresholdValue, setThresholdValue] = useState(window.innerWidth / 14); // ค่าเริ่มต้น 1/14 ของความกว้างหน้าจอ
    useEffect(() => {
        const handleResize = () => {
            setThresholdValue(window.innerWidth / 14);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Modal edit open
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    // ดึงคำถามที่เลือกจะแก้ไข
    const [textAnswer, setTextAnswer] = useState('');
    const [cloneAnswer, setCloneAnswer] = useState('');
    const handleInputAnswerChange = (e) => {
        setTextAnswer(e.target.value);
    };

    const toggleModalEdit = (answer) => {
        const currentDate = new Date();
        if (answer == "save") {
            console.log("Save toggle Edit")
            // ค้นหา index ของข้อมูลที่ต้องการอัพเดท
            const dataIndex = database[indexQuestion].answer.findIndex((item) => item.id === cloneAnswer.id);
            setDatabase((prevDatabase) => {
                const updatedDatabase = [...prevDatabase];
                updatedDatabase[indexQuestion].answer[dataIndex].detail = textAnswer;
                updatedDatabase[indexQuestion].answer[dataIndex].date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()+543}`;
                updatedDatabase[indexQuestion].answer[dataIndex].time = currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                updatedDatabase[indexQuestion].answer[dataIndex].edit = true;
                return updatedDatabase;
            })
            setCloneAnswer('')
            setTextAnswer('')
        }
        else {
            setCloneAnswer(answer)
            setTextAnswer(answer.detail)
        }
        setIsModalEditOpen(!isModalEditOpen);
    };

    // Modal delete open
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [answerIdDelete, setAnswerIdDelete] = useState(null)
    const toggleModalDelete = (command, answerId) => {
        if (command === 'X' || command === 'cancle') {
            setAnswerIdDelete(null)
            setIsModalDeleteOpen(false);
        } else if (command === 'openModal') {
            setAnswerIdDelete(answerId)
            setIsModalDeleteOpen(true);
        } else if (command === 'delete') {
            const newDatabase = database.map(question => {
                if (question.id === questionId) {
                    return {
                        ...question,
                        answer: question.answer.filter(answer => answer.id !== answerIdDelete),
                    }
                }
                return question;
            })
            setDatabase(newDatabase)
            setAnswerIdDelete(null)
            setIsModalDeleteOpen(false);
        }
        setIsModalDeleteOpen(!isModalDeleteOpen);
    };

    // เพิ่มข้อมูลลงฐานข้อมูล
    const [answer, setAnswer] = useState('');
    const postAnswer = () => {
        const currentDate = new Date();
        const newAnswer = {
            id: data.answer[data.answer.length-1].id + 5, //สร้าง ID ไม่ซ้ำกัน
            name: user,
            detail: answer,
            date: `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear() + 543}`,
            time: currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        };
        const newDatabase = database.map(question => {
            if (question.id === questionId) {
                return {
                    ...question,
                    //เอาคำตอบเก่าของคำถามตามid และต่อด้วย คำตอบใหม่
                    answer: [...question.answer, newAnswer],
                };
            }
            return question;
        });
        // Update the state with the new array
        setDatabase(newDatabase);
        setAnswer('')
    }

    return (
        <div>
            <div className="flex items-center gap-2">
                <div className="border-gray-300 border-b-[1.5px] w-full"></div>
                <button className={`rotate-180`}>
                    <Icon icon="mingcute:down-line" color='#00000080' width="19" height="19" onClick={() => toggleCommentQuestion(indexQuestion)} />
                </button>
            </div>
            {data.answer.map((answer, index) => (
                <div key={index} className="my-3">
                    {/* profile */}
                    <div className="mx-2 bg-[#E3F3FF] rounded-[10px]">
                        <div className="flex pt-3 px-3">
                            <p className="text-[#A4A4A4] text-l font-[400] ">Answer by {answer.name}</p>
                            {/* Can it be Edit/Delete ? */}
                            {answer.name === user &&
                                <Menu placement="bottom-end">
                                    <MenuHandler>
                                        <div className="absolute right-28 cursor-pointer">
                                            <Icon icon="prime:ellipsis-h" color="#151c38" width="19" height="19" />
                                        </div>
                                    </MenuHandler>
                                    <MenuList className="bg-[#ffffff] border border-gray-200 shadow-md rounded-xl text-sm">
                                        <MenuItem className="hover:bg-gray-200 cursor-pointer rounded-xl" onClick={() => toggleModalEdit(answer)} >
                                            <div className="flex item-center py-3">
                                                <Icon
                                                    icon="fluent:edit-24-regular"
                                                    color="#727272"
                                                    width="15"
                                                    height="15"
                                                />
                                                <span className="pl-3 text-gray-700">Edit Answer</span>
                                            </div>
                                        </MenuItem>
                                        <MenuItem className="hover:bg-gray-200 cursor-pointer rounded-xl" onClick={() => toggleModalDelete('openModal', answer.id)}>
                                            <div className="hover:bg-gray-200 cursor-pointer">
                                                <div className="flex item-center py-3">
                                                    <Icon
                                                        icon="mingcute:delete-3-line"
                                                        color="#727272"
                                                        width="15"
                                                        height="15"
                                                    />
                                                    <p className="pl-3 text-gray-700">Delete Answer</p>
                                                </div></div>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            }
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
                                                        Edit Question
                                                    </h5>
                                                    {/* close */}
                                                    <button type="button" className="absolute top-5 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setIsModalEditOpen(false)}>
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
                                                        value={textAnswer}
                                                        onChange={handleInputAnswerChange}
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
                                                        Delete Review
                                                    </h5>
                                                    {/* close */}
                                                    <button type="button" className="absolute top-5 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => toggleModalDelete('X')}>
                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                {/* body */}
                                                <div className="flex flex-col p-4 md:p-5 justify-center items-center text-2xl font-normal">
                                                    <p>Are you sure you want to</p>
                                                    <p>delete your Question?</p>
                                                </div>
                                                {/* footer */}
                                                <div className="flex flex-row gap-4 mb-2 mt-6">
                                                    <div className="flex items-center pl-6 rounded-b mt-[-20px] mb-2 w-full">
                                                        <button
                                                            onClick={() => toggleModalDelete('cancle')}
                                                            type="button"
                                                            className="text-gray-500 bg-white hover:from-[#029BE0] hover:to-[#0D0B5F] font-medium rounded-lg text-lg px-10 py-2 text-center w-full border-2 border-[#D9D9D9]"
                                                        >
                                                            Cancle
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
                        </div>
                        <div className="flex px-5 pb-3">
                            <p className="text-[#000000] w-full px-5 py-3">
                                <span style={{ ...(!(showMore[index]) ? { display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', WebkitLineClamp: 1 } : {}) }}>
                                    {answer.detail}
                                </span>
                                {answer.detail.length > thresholdValue && (
                                    <span>
                                        {!(showMore[index]) && (
                                            <button className="text-[#A7A7A7] text-sm ml-2" onClick={() => toggleShowmore(answer.id)}>
                                                ...show more
                                            </button>
                                        )}
                                        {showMore[index] && (
                                            <button className="text-[#A7A7A7] text-sm ml-2" onClick={() => toggleShowmore(answer.id)}>
                                                ...show less
                                            </button>
                                        )}
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                    <p className="text-[#A4A4A4] text-l font-[350] px-3">{answer.date}, {answer.time}  {answer.edit && <> (edit)</>}</p>
                </div>
            ))}
            <div name="post" className="relative mx-2">
                <input
                    className="w-full h-[50px] rounded-[10px] border-0 py-5 pl-7 pr-20 text-[16px] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-[#0D0B5F] "
                    placeholder="Answer" value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                ></input>
                <button
                    className="py-[6px] px-[12px] rounded-[10px] bg-gradient-to-br from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%] text-[#ffffff] hover:from-[#029BE0] hover:to-[#0D0B5F] absolute right-4 top-3 text-[16px]"
                    onClick={postAnswer}>
                    <Icon icon="wpf:sent" color="#fff" className="py-0.1" />
                </button>
            </div>
        </div>
    )
};
export default CommentCard;