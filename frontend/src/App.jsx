import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Navbar from './components/Navbar.jsx';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      setUser(JSON.parse(storedUser || "null"));
    } catch (error) {
      console.error("Invalid user JSON:", error);
      localStorage.removeItem("user");
    }
  }
}, []);

    return(
      <>
        <BrowserRouter>
        <Navbar user={user} setUser={setUser} />
            <Routes>
              <Route path="/" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute> } />
              <Route path="/register" element={<Register setUser={setUser}/>} />
              <Route path="/login" element={<Login setUser={setUser}/>} />
            </Routes>
        </BrowserRouter>
        <ToastContainer position="top-center" autoClose={2000} />
        </>
    )
}

export default App;