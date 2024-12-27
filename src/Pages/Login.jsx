import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const loginUser = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === credentials.username && user.password === credentials.password);

    if (user) {
      sessionStorage.setItem('loggedUser', JSON.stringify(user));
      alert("התחברת בהצלחה!");
      navigate('/profile');
    } else {
      alert("שם משתמש או סיסמה שגויים!");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px', direction: 'rtl' }}>
      <h2>כניסה</h2>
      <label>שם משתמש:</label>
      <input type="text" name="username" onChange={handleChange} placeholder="הזן שם משתמש" className="form-control"/>
      
      <label>סיסמה:</label>
      <input type="password" name="password" onChange={handleChange} placeholder="הזן סיסמה (7-12 תווים)" className="form-control"/>
      
      <button onClick={loginUser} className="btn btn-primary mt-3">כניסה</button>
    </div>
  );
}
