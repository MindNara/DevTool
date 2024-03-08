import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Homepage,
  Dashboard,
  Review,
  HowToRegister,
  SignIn,
  SignUp,
  Layout,
  ReviewSubjectDetail,
  ReviewLayout,
} from './pages/index';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const ProtectedRoute = ({ element, path }) => {
    return user ? element : <Navigate to="/signin" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="review" element={<ProtectedRoute element={<ReviewLayout />} />}>
            <Route index element={<Review />} />
            <Route path=":reviewId" element={<ReviewSubjectDetail />} />
          </Route>
        </Route>
        <Route path="howToRegister" element={<ProtectedRoute element={<HowToRegister />} />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App