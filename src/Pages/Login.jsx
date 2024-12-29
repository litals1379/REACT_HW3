import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ userName: '', password: '' });
  const users = JSON.parse(localStorage.getItem('users'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const validate = () => {
    const newErrors = {};
    const usernameRegex = /^[a-zA-Z0-9!@#$%^&*]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,12}$/;
    let isValid = true;
    
    if (!formData.userName) {
      newErrors.userName = 'שם משתמש הוא שדה חובה.';
      isValid = false;
    } else if (formData.userName.length > 60) {
      newErrors.userName = 'שם משתמש חייב להכיל עד 60 תווים';
      isValid = false;
    } else if (!usernameRegex.test(formData.userName)) {
      newErrors.userName = 'שם משתמש חייב להכיל אותיות באנגלית, מספרים ותווים מיוחדים.';
      isValid = false;
    }
    
     //validate password
     if (!formData.password) {
      newErrors.password = 'סיסמה היא שדה חובה.';
      isValid=false;
    }
    else if (formData.password.length < 7) {
      newErrors.password = 'סיסמה חייבת להכיל לפחות 7 תווים';
      isValid=false;
     
  }
  else if (formData.password.length > 12) {
    newErrors.password = 'סיסמה חייבת להכיל לכל היותר 12 תווים';
    isValid=false;
      
  }
    // else if (!passwordRegex.test(formData.password)) {
    //   newErrors.password = 'סיסמה חייבת להכיל 7-12 תווים, כולל אות גדולה, מספר ותו מיוחד.';
    //   isValid=false;
    // }
    setErrors(newErrors);
    return isValid;
  };

 

  const loginUser = () => {
    if (!validate()) {
      return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => 
      user.username === formData.userName && 
      user.password === formData.password
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


  // const loginUser = () => {
  //   const users = JSON.parse(localStorage.getItem('users')) || [];
  //   const user = users.find(user => 
  //     user.username === userDetails.username && 
  //     user.password === userDetails.password
  //   );

  //   if (user) {
  //     sessionStorage.setItem('loggedUser', JSON.stringify(user));
  //     // Update the login state in parent component
  //     setIsLoggedIn(true);
  //     alert("התחברת בהצלחה!");

  //     if (user.role === 'admin') {
  //       navigate('/admin');
  //     } else {
  //       navigate('/profile');
  //     }
  //   } else {
  //     alert("שם משתמש או סיסמה שגויים!");
  //   }
  // };

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
      <input type="text" name="userName" onChange={handleChange} placeholder="הזן שם משתמש" className="form-control" />
      {errors.userName && <p style={{ color: 'red' }}>{errors.userName}</p>}
      <label>סיסמה:</label>
      <input type="password" name="password" onChange={handleChange} placeholder="הזן סיסמה (7-12 תווים)" className="form-control" />
      {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      <button onClick={loginUser} className="btn btn-primary mt-3">כניסה</button> <br />
      <button onClick={RegisterLink}  >עוד לא נירשמת? הירשם עכשיו</button>
    </div>
  );
}