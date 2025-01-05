import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

export default function EditDetails() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const userData = state || JSON.parse(sessionStorage.getItem('loggedUser'));

    const [updatedUserData, setUpdatedUserData] = useState(userData);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        if (name === 'profileImage') {
          if (files && files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUpdatedUserData({ ...userData, profileImage: reader.result });
                const base64String = userData.profileImage.split(',')[1]; 
                const uniqueImageKey = `profileImage_${userData.email}`; // Unique key based on email
            
                // Store the base64 string in localStorage with a unique key
                localStorage.setItem(uniqueImageKey, base64String);
            
                // Store the user data with a reference to the unique key
                userData.profileImage = uniqueImageKey; 
            };
            reader.readAsDataURL(files[0]); 
          } else {
            setUpdatedUserData({ ...userData, profileImage: null }); 
          }
        } else {
            setUpdatedUserData({ ...userData, [name]: value });
        }
      };

    const edit = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const updatedUsers = users.map(user => 
            user.email === updatedUserData.email ? updatedUserData : user
        );

        localStorage.setItem('users', JSON.stringify(updatedUsers));
        sessionStorage.setItem('loggedUser', JSON.stringify(updatedUserData));

        alert("הפרטים עודכנו בהצלחה!");
        navigate('/profile', { state: updatedUserData });
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <h2>עריכת פרטי משתמש</h2>
            <label>:שם משתמש</label>
            <input 
                type="text" 
                name="username" 
                value={updatedUserData.username} 
                onChange={handleChange} 
                className="form-control" 
            />

            <label>:סיסמא</label>
            <input 
                type="text" 
                name="password" 
                value={updatedUserData.password} 
                onChange={handleChange} 
                className="form-control" 
            />

            <label>:שם פרטי</label>
            <input 
                type="text" 
                name="firstName" 
                value={updatedUserData.firstName} 
                onChange={handleChange} 
                className="form-control" 
            />

            <label>:שם משפחה</label>
            <input 
                type="text" 
                name="lastName" 
                value={updatedUserData.lastName} 
                onChange={handleChange} 
                className="form-control" 
            />

            <label>:תאריך לידה</label>
            <input 
                type="date" 
                name="birthDate" 
                value={updatedUserData.birthDate} 
                onChange={handleChange} 
                className="form-control" 
            />

            <label>:עיר</label>
            <input 
                type="text" 
                name="city" 
                value={updatedUserData.city} 
                onChange={handleChange} 
                className="form-control" 
            />

            <label>:רחוב</label>
            <input 
                type="text" 
                name="street" 
                value={updatedUserData.street} 
                onChange={handleChange} 
                className="form-control" 
            />

            <label>:מספר</label>
            <input 
                type="text" 
                name="street_number" 
                value={updatedUserData.street_number} 
                onChange={handleChange} 
                className="form-control" 
            />

            <label>תמונת פרופיל:</label>
            <input
            type="file"
            accept=".jpg,.jpeg"
            name="profileImage"
            onChange={handleChange}
            className="form-control"
            />

            <label>:אימייל</label>
            <input 
                type="email" 
                name="email" 
                value={updatedUserData.email} 
                disabled 
                className="form-control" 
            />

            <button onClick={edit} className="btn btn-primary mt-3">עדכון פרטים</button>
        </div>
    );
}
