import { useState, useEffect } from 'react'
import './App.css'
import { Navigate, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import EditDetails from './Pages/EditDetails';
import SystemAdmin from './Pages/SystemAdmin';
import UserContextProvider from './Pages/UserContextProvider';
import ProtectedRoute from './Pages/ProtectedRoute'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check login status when component mounts
    const user = sessionStorage.getItem('loggedUser');
    setIsLoggedIn(!!user);

    // Listen for storage events to handle logout in other tabs
    const handleStorageChange = () => {
      const user = sessionStorage.getItem('loggedUser');
      setIsLoggedIn(!!user);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <>
      {!isLoggedIn && (
        <div>
          <Link to="/">כניסה</Link> |
          <Link to="/register">הרשמה</Link>
        </div>
      )}

      {isLoggedIn && (
        <div>
          <Link to="/profile">פרופיל</Link> |
          {JSON.parse(sessionStorage.getItem('loggedUser'))?.role === "admin" && 
            <Link to="/admin">מנהל מערכת</Link>
          }
        </div>
      )}

      <div className="card">
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/edit-details" element={<EditDetails />} />
          <Route path="/admin" element={
            <UserContextProvider>
              <SystemAdmin />
            </UserContextProvider>
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;