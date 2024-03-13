import React, { useState, useEffect } from 'react'
import PostDetailCard from '../components/post/PostDetailCard'
import PopularSubjectsCard from '../components/popularSubjects/PopularSubjectsCard'
import AddNewPost from '../components/createPost/AddNewPost'
import Layout from './Layout'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from '../config/firebase';

// ยากเกิ้นคุณพรี่

function Dashboard() {

  const [userData, setUserData] = useState({ userId: '', role: '', email: '' });

  useEffect(() => {
    // .onAuthStateChanged = เมื่อสถานะการตรวจสอบการเข้าสู่ระบบของผู้ใช้เปลี่ยนแปลง
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userRef = collection(db, 'user');
          const querySnapshot = await getDocs(query(userRef, where('userId', '==', user.uid)));
          if (!querySnapshot.empty) {
            const userInfo = querySnapshot.docs[0].data();
            setUserData({ userId: userInfo.userId, role: userInfo.role, email: userInfo.email });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.log('No user is signed in.');
      }
    });

    return unsubscribe;
  }, []); // อย่าลืมใส่ dependency array เป็น []

  return (
    <div className='w-full h-full'>
      <header className='text-[40px] max-2xl:text-[34px] font-semibold bg-gradient-to-br from-[#0D0B5F] from-[12.5%] to-[#029BE0] to-[100%] inline-block text-transparent bg-clip-text'>
        Announcement
      </header>
      <div className='w-full h-auto flex mt-5'>
        <div className='w-full mr-10'>
          {userData.role == 'admin' && <AddNewPost userId={userData.userId} />}
          <PostDetailCard userId={userData.userId} role={userData.role} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
