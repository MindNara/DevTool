import React, { useState } from "react";
import { Link } from "react-router-dom";

const CardSubject = ({ item }) => {
    return (
        <>
            {item.map((detail, index) => (
                <Link to={`/review/${detail.subjectId}`}>
                    <div className="max-w mt-4 p-6 bg-white border border-gray-200 rounded-xl hover:bg-gray-100">
                        <div className="grid grid-cols-3">
                            <h5 className="mb-2 text-lg font-bold text-[#151C38]">{detail.subjectId}</h5>
                            <div>
                                <h5 className="mb-2 text-lg font-bold text-[#151C38]">{detail.subjectName}</h5>
                                <h5 className="mb-2 text-lg font-bold text-[#151C38]">{detail.subjectNameEn}</h5>
                            </div>
                            <div className="text-right">
                                <h5 className="mb-2 text-lg font-bold text-[#151C38]">{detail.subjectCredit}</h5>
                            </div>
                        </div>
                        <div className="inline-flex items-center px-3 py-1 text-lg font-medium text-center text-white bg-[#151C38] rounded-xl">{detail.subjectType}</div>
                    </div>
                </Link>
            ))}
        </>
    );
};

export default CardSubject;
