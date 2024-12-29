import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: '', password: '' });

  const addAdminIfNotExists = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const adminExists = users.some(user => user.username === 'admin');

    if (!adminExists) {
      const adminUser = {
        username: 'admin',
        password: 'ad12343211ad',
        role: 'admin',
        email: 'admin@admin.com',
        firstName: '',
        lastName: '',
        birthDate: '',
        city: '',
        street: '',
        street_number: '',
        profileImage: null,
      };
      users.push(adminUser);
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const loginUser = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => 
      user.username === userDetails.username && 
      user.password === userDetails.password
    );

    if (user) {
      sessionStorage.setItem('loggedUser', JSON.stringify(user));
      // Update the login state in parent component
      setIsLoggedIn(true);
      alert("התחברת בהצלחה!");

      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } else {
      alert("שם משתמש או סיסמה שגויים!");
    }
  };

  const RegisterLink = () => {
    navigate('/register');
  };

  useEffect(() => {
    addAdminIfNotExists();
  }, []);

  return (
    <div className="container mt-5" style={{ maxWidth: '500px', direction: 'rtl' }}>
      <h2>כניסה</h2>
      <label>שם משתמש:</label>
      <input
        type="text"
        name="username"
        onChange={handleChange}
        placeholder="הזן שם משתמש"
        className="form-control"
      />
      
      <label>סיסמה:</label>
      <input
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="הזן סיסמה (7-12 תווים)"
        className="form-control"
      />
      
      <button onClick={loginUser} className="btn btn-primary mt-3">כניסה</button>
      <br/>
      <button onClick={RegisterLink} className="btn btn-link">
        עוד לא נרשמת? הירשם עכשיו
      </button>
    </div>
  );
}