import { useState,useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import CitiesData from '../Data/Cities.json';
import { UserContext } from './UserContextProvider';

const cities = [];
CitiesData.map((city) => {
  cities.push(city.name);
});


export default function Register() {
  const navigate = useNavigate();
  const {addUser} = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // Toggle state
  const [filteredCities, setFilteredCities] = useState([]);

  // const [selectedCity, setSelectedCity] = useState(''); // Dropdown state

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
    profileImage: null,
  });
  
 


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, city: value });

    if (value) {
      const filtered = cities.filter(city => city.includes(value));
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

console.log(formData);

  const validate = () => {
    const newErrors = {};
    const usernameRegex = /^[a-zA-Z0-9!@#$%^&*]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,12}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
    let isValid=true;

    //validate user name
    if (!formData.userName) {
      newErrors.userName = 'שם משתמש הוא שדה חובה.';
      isValid=false;
  } else if (formData.userName.length > 60) {
      newErrors.userName = 'שם משתמש חייב להכיל עד 60 תווים';
      isValid=false;
  } else if (!usernameRegex.test(formData.userName)) {
    newErrors.userName = 'שם משתמש חייב להכיל אותיות באנגלית, מספרים ותווים מיוחדים.';
    isValid=false;
  }
   
   //validate password
    if (!formData.password) {
      newErrors.password = 'סיסמה היא שדה חובה.';
      isValid=false;
    }
    else if (formData.password.length <= 7) {
      newErrors.password = 'סיסמה חייבת להכיל לפחות 7 תווים';
      isValid=false;
     
  }
  else if (formData.password.length >= 12) {
    newErrors.password = 'סיסמה חייבת להכיל לכל היותר 12 תווים';
    isValid=false;
      
  }
    else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'סיסמה חייבת להכיל 7-12 תווים, כולל אות גדולה, מספר ותו מיוחד.';
      isValid=false;
    }

    //validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'סיסמאות אינן תואמות.';
      isValid=false;
    }

    //validate email
    if (!formData.email) {
      newErrors.email = 'אימייל הוא שדה חובה.';
      isValid=false;
    }
    else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה.';
      isValid=false;
    }

    //validate profile image
    if(!formData.profileImage) {
      newErrors.profileImage = 'תמונת פרופיל היא שדה חובה.';
      isValid=false;
    }

    else if (formData.profileImage && !/\.(jpg|jpeg)$/i.test(formData.profileImage.name)) {
      newErrors.profileImage = 'ניתן להעלות תמונה בפורמט .jpg או .jpeg בלבד.';
      isValid=false;
    }

    //validate birth date
    if (!formData.birthDate) {
      newErrors.birthDate = 'תאריך לידה הוא שדה חובה.';
      isValid=false;
    }
    else if (calculateAge(formData.birthDate) < 18) {
      newErrors.birthDate = 'גיל חייב להיות לפחות 18.';
      isValid=false;
    }
    else if (calculateAge(formData.birthDate) > 120) {
      newErrors.birthDate = 'גיל חייב להיות עד 120.';
      isValid=false;
    }

    if (!formData.firstName) {
      newErrors.firstName = 'שם פרטי הוא שדה חובה.';
      isValid=false;
    }
    if (!formData.lastName) {
      newErrors.lastName = 'שם משפחה הוא שדה חובה.';
      isValid=false;
    }
    if (!formData.city) {
      newErrors.city = 'עיר היא שדה חובה.';
      isValid=false;
    }
    if (!formData.street) {
      newErrors.street = 'רחוב הוא שדה חובה.';
      isValid=false;
    }
    if (!formData.street_number) {
      newErrors.street_number = 'מספר רחוב הוא שדה חובה.';
      isValid=false;
    }
    else if (Number(formData.street_number) < 1) {
      newErrors.street_number = 'מספר רחוב חייב להיות גדול מ-0.';
      isValid=false;
    }
    console.log(isValid);
    setErrors(newErrors);
    return true;
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
    console.log("inRegister handle func");
    if (!validate()) {
      alert('אחד או יותר מהשדות אינם תקינים.');
      return;
    }
    addUser(formData);
    alert('נרשמת בהצלחה!');
    navigate('/', { state: formData });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px', direction: 'rtl' }}>
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

        <button type="button" onClick={registerUser} className="btn btn-primary mt-3">
          הרשמה
        </button>
      </form>
    </div>
  );
}
