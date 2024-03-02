import React, { useState, useEffect } from 'react'
import CardSubject from '../components/cardReview/CardSubject'
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../config/firebase';

function Review() {

  const [subjects, setSubjects] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const [typeSearch, setTypeSearch] = useState('ทั้งหมด');
  const [subjectItem, setSubjectsTtem] = useState([]);

  const getSubject = () => {
    let SubjectQuery;
    if (typeSearch == "ทั้งหมด") {
      SubjectQuery = query(collection(db, "course"));
    }
    else {
      SubjectQuery = query(collection(db, "course"), where("type", "==", typeSearch));
    }

    const unsubscribe = onSnapshot(SubjectQuery, (snapshot) => {
      const subjectData = [];
      snapshot.forEach((doc) => {
        subjectData.push({ ...doc.data(), key: doc.id });
      });
      console.log(subjectData);
      setSubjects(subjectData);
    }, (error) => {
      console.error("Error fetching subject:", error);
    });
    // คืนค่าฟังก์ชัน unsubscribe เพื่อที่เราจะเรียกเมื่อต้องการหยุดฟังค้นหา
    return unsubscribe;
  }

  useEffect(() => {
    const unsubscribe = getSubject();
    return unsubscribe;  // จะเรียกเมื่อ component ถูก unmount
  }, []);

  const getSubjectFilter = () => {
    const filteredSubjects = subjects.filter(subject =>
      (subject.subject_id.toLowerCase().includes(textSearch.toLowerCase()) ||
      subject.subject_name_th.toLowerCase().includes(textSearch.toLowerCase()) ||
      subject.subject_name_en.toLowerCase().includes(textSearch.toLowerCase()))
    );
    console.log(textSearch);
    console.log(filteredSubjects);
    setSubjectsTtem(filteredSubjects);
    // return filteredSubjects;
  }


  return (
    <>
      <div className='w-full h-auto flex'>
        <div className='w-full pr-5'>
          <div className='flex flex-row gap-3'>
            <h1 className='text-[26px] font-medium text-[#151C38]'>รายวิชาเรียน</h1>
            <select className="text-white bg-[#151C38] rounded-lg text-lg px-2" name='selectType' defaultValue={typeSearch} onChange={(e) => setTypeSearch(e.target.value)} onClick={getSubject}>
              <option value="วิชาบังคับ">วิชาบังคับ</option>
              <option value="เสรีทั่วไป">วิชาเสรีทั่วไป</option>
              <option value="เสรีคณะ">วิชาเสรีคณะ</option>
              <option value="ทั้งหมด">ทั้งหมด</option>
            </select>
          </div>
          <div className='inputSearch flex flex-row mt-4 gap-3 drop-shadow-sm	'>
            <img width="35" height="35" src='https://img.icons8.com/fluency-systems-filled/48/c0c0c0/search.png' className='icon mt-1 ml-2'></img>
            <input type='text' name='email' placeholder='Type to search ...' className='w-full h-[45px] font-light' value={textSearch} onChange={(e) => setTextSearch(e.target.value)} onKeyDown={(e) => { 
              if (e.key === 'Enter') { 
                getSubjectFilter();
            }}}></input>
            <button className='bg-[#FFFFFF] w-[60px] rounded-xl border-[1px] border-[#D9D9D9] drop-shadow-sm' onClick={() => setTextSearch('')}>
              <img width="20" height="20" src='https://img.icons8.com/material-rounded/24/737373/delete-sign.png' className='icon top-3 ml-4'></img>
            </button>
          </div>
          {textSearch == '' ? (<CardSubject item={subjects} />) : (<CardSubject item={subjectItem} />)}
          
        </div>


      </div>
    </>
  )
}

export default Review