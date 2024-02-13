import React, { useState } from "react";
import { Link } from "react-router-dom";

const CardSubject = ({ item }) => {
    return (
        <>
            {item.map((detail, index) => (
                <Link to={`/review/${detail.subject_id}`}>
                    <div className="max-w mt-4 p-6 bg-white border border-gray-200 rounded-xl hover:bg-gray-100">
                        <div className="flex flex-row w-full justify-between">
                            <h5 className="mb-2 text-lg font-bold text-[#151C38]">{detail.subject_id}</h5>
                            <div className="w-[60%] ml-20 flex-col justify-center items-center"> {/* เพิ่ม items-center เพื่อจัดให้อยู่กึ่งกลางในแนวแกนตั้ง */}
                                <h5 className="mb-2 text-lg font-bold text-[#151C38]">{detail.subject_name_th}</h5>
                                <h5 className="mb-2 text-lg font-bold text-[#151C38]">{detail.subject_name_en}</h5>
                            </div>
                            <div className="text-right">
                                <h5 className="mb-2 text-lg font-bold text-[#151C38]">{detail.credit}</h5>
                            </div>
                        </div>
                        <div className="inline-flex items-center px-3 py-1 text-lg font-medium text-center text-white bg-[#151C38] rounded-xl">{detail.type}</div>
                    </div>
                </Link>
            ))}
        </>
    );
};

export default CardSubject;
