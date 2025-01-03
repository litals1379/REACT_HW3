import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import CitiesData from '../assets/cities.json';

const cities = [];
CitiesData.map((city) => {
  cities.push(city.name);
});

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    city: '',
    street: '',
    street_number: '',
    role: 'user',
    profileImage: null, // Store the image as a data URL
    favorite_game: '',
  });
  const [errors, setErrors] = useState({});
  const [filteredCities, setFilteredCities] = useState([]);
  const [showPassword, setShowPassword] = useState(false); 

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'profileImage') {
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, profileImage: reader.result }); 
        };
        reader.readAsDataURL(files[0]); 
      } else {
        setFormData({ ...formData, profileImage: null }); 
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, city: value });

    if (value) {
      const filtered = cities.filter((city) => city.includes(value));
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  const validate = () => {
    const newErrors = {};
    const usernameRegex = /^[a-zA-Z]{1,60}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,12}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
    const urlRegex = /^(https?:\/\/)([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,})(:[0-9]{1,5})?(\/[^\s]*)?$/;

    if (!formData.username) {
      newErrors.username = 'שם משתמש הוא שדה חובה.';
    } else if (!usernameRegex.test(formData.username)) {
      newErrors.username = 'שם משתמש יכול להכיל רק אותיות (עד 60 תווים).';
    }
    if (!formData.password) {
      newErrors.password = 'סיסמה היא שדה חובה.';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'סיסמה חייבת להכיל 7-12 תווים, כולל אות גדולה, מספר ותו מיוחד.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'סיסמאות אינן תואמות.';
    }
    if (!formData.email) {
      newErrors.email = 'אימייל הוא שדה חובה.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה.';
    }
    if (!formData.birthDate) {
      newErrors.birthDate = 'תאריך לידה הוא שדה חובה.';
    } else if (calculateAge(formData.birthDate) < 18) {
      newErrors.birthDate = 'גיל חייב להיות לפחות 18.';
    } else if (calculateAge(formData.birthDate) > 120) {
      newErrors.birthDate = 'גיל חייב להיות עד 120.';
    }

    if (!formData.favorite_game) {
      newErrors.favorite_game = 'משחק הוא שדה חובה.';
    } else if (!urlRegex.test(formData.favorite_game)) {
      newErrors.favorite_game = 'קישור למשחק לא תקין!';
    }

    if (!formData.firstName) {
      newErrors.firstName = 'שם פרטי הוא שדה חובה.';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'שם משפחה הוא שדה חובה.';
    }
    if (!formData.city) {
      newErrors.city = 'עיר היא שדה חובה.';
    }
    if (!formData.street) {
      newErrors.street = 'רחוב הוא שדה חובה.';
    }
    if (!formData.street_number) {
      newErrors.street_number = 'מספר רחוב הוא שדה חובה.';
    } else if (Number(formData.street_number) < 1) {
      newErrors.street_number = 'מספר רחוב חייב להיות גדול מ-0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const registerUser = () => {
    if (!validate()) {
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    const existingUser = users.find((user) => user.email === formData.email);
    if (existingUser) {
      alert('מייל זה כבר רשום במערכת!');
      return;
    }
  
    // Handle image storage (if applicable)
    if (formData.profileImage) {
      const base64String = formData.profileImage.split(',')[1]; 
      const uniqueImageKey = `profileImage_${formData.email}`; // Unique key based on email
  
      // Store the base64 string in localStorage with a unique key
      localStorage.setItem(uniqueImageKey, base64String);
  
      // Store the user data with a reference to the unique key
      formData.profileImage = uniqueImageKey; 
    }
  
    // Add user data to localStorage
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    alert('נרשמת בהצלחה!');
    navigate('/', { state: formData });
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '500px', direction: 'rtl' }}>
      <h2>הרשמה</h2>
      <form>
        <label>שם משתמש:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="הזן שם משתמש (אותיות בלבד)"
          className="form-control"
        />
        {errors.username && <div className="text-danger">{errors.username}</div>}

        <label>סיסמה:</label>
        <div className="input-group">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="הזן סיסמה (7-12 תווים)"
            className="form-control"
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
        {errors.password && <div className="text-danger">{errors.password}</div>}

        <label>אימות סיסמה:</label>
        <div className="input-group">
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="אמת את הסיסמה"
            className="form-control"
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
        {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}

        <label>אימייל:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@example.com"
          className="form-control"
        />
        {errors.email && <div className="text-danger">{errors.email}</div>}

        <label>שם פרטי:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="הזן שם פרטי"
          className="form-control"
        />
        {errors.firstName && <div className="text-danger">{errors.firstName}</div>}

        <label>שם משפחה:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="הזן שם משפחה"
          className="form-control"
        />
        {errors.lastName && <div className="text-danger">{errors.lastName}</div>}

        <label>תאריך לידה:</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          className="form-control"
        />
        {errors.birthDate && <div className="text-danger">{errors.birthDate}</div>}

        <label>עיר:</label>
        <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleCityChange}
        placeholder="הזן עיר מגורים"
        className="form-control"
      />
      {filteredCities.length > 0 && (
        <ul className="autocomplete-list" style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {filteredCities.map((city, index) => (
            <li key={index} onClick={() => setFormData({ ...formData, city })}
               style={{ cursor: 'pointer', padding: '5px', backgroundColor: '#fff' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#fff'}>
              {city}
            </li>
          ))}
        </ul>
      )}
        {errors.city && <div className="text-danger">{errors.city}</div>}

        <label>רחוב:</label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="הזן שם רחוב"
          className="form-control"
        />
        {errors.street && <div className="text-danger">{errors.street}</div>}

        <label>מספר רחוב:</label>
        <input
          type="number"
          name="street_number"
          value={formData.street_number}
          onChange={handleChange}
          placeholder="הזן מספר רחוב"
          className="form-control"
        />
        {errors.street_number && <div className="text-danger">{errors.street_number}</div>}

        <label>תמונת פרופיל:</label>
        <input
          type="file"
          name="profileImage"
          onChange={handleChange}
          className="form-control"
        />
        {errors.profileImage && <div className="text-danger">{errors.profileImage}</div>}
        {formData.profileImage && (
          <img src={formData.profileImage} alt="Profile Image" className="img-thumbnail" /> 
        )}

        <label className="mt-3">קישור למשחק אונליין אהוב:</label>
          <input
            type="url"
            name="favorite_game"
            value={formData.favorite_game}
            onChange={handleChange}
            placeholder='הזן משחק אהוב'
            // readOnly
            className="form-control mt-2"
            // style={{ maxWidth: '400px' }}
          />
          {errors.favorite_game && <div className="text-danger">{errors.favorite_game}</div>}
          
        <button type="button" onClick={registerUser} className="btn btn-primary mt-3">
          הרשמה
        </button>
      </form>
    </div>
  );
}
