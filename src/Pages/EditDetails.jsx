import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

export default function EditDetails() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const userData = state || JSON.parse(sessionStorage.getItem('loggedUser'));

    const [updatedUserData, setUpdatedUserData] = useState(userData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUserData({ ...updatedUserData, [name]: value });
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
