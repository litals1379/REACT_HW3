import { useState } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import EditDetails from './Pages/EditDetails';
import SystemAdmin from './Pages/SystemAdmin';
import UserContextProvider from './Pages/UserContextProvider';

function App() {
  const onlineUser = sessionStorage.getItem('loggedUser');

  return (
    <>
    
      <Link to= "/register">הרשמה</Link>|
      <Link to= "/">כניסה</Link>|
      {onlineUser && onlineUser.role === 'admin' ? (
        <>
      <Link to="/admin">מנהל מערכת</Link>
      </>
      ) : 
      (
      <>
      <Link to= "/profile">פרופיל</Link>|
      </>
  )}

        <div className="card">
        <Routes>
            <Route path='/' element = {<Login/>}/>
            <Route path='/register' element = {<Register/>}/>
            <Route path='/profile' element = {<Profile/>}/>
            <Route path="/edit-details" element={<EditDetails />} />
            <Route path="/admin" element={
              <UserContextProvider>
            <SystemAdmin />
            </UserContextProvider>
          } />
        </Routes>
        
      </div>

    </>
  )
}
export default App
