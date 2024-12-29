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
  return (
    <>
        <Link to= "/">כניסה</Link>|
        <Link to= "/register">הרשמה</Link>|
        <Link to= "/profile">פרופיל</Link>|
        <Link to="/admin">מנהל מערכת</Link>

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