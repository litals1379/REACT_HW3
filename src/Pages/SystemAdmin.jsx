import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from './UserContextProvider';

export default function SystemAdmin() {
  const { users, DeleteUser, EditUser } = useContext(UserContext);

  const [editingUser, setEditingUser] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    birthDate: '',
    street: '', 
    street_number: '',
    city: '',
    email: '',
  });
  const [avatars, setAvatars] = useState({});

  useEffect(() => {
    const loadAvatars = () => {
      const avatarsMap = {};
      users.forEach((user) => {
        const image = loadImageFromLocalStorage(user.email);
        if (image) {
          avatarsMap[user.email] = image;
        }
      });
      setAvatars(avatarsMap);
    };

    loadAvatars();
  }, [users]);

  const loadImageFromLocalStorage = (email) => {
    const imageData = localStorage.getItem(`profileImage_${email}`);
    return imageData ? `data:image/jpeg;base64,${imageData}` : '/images/default-avatar.png'; // החזרת תמונה ברירת מחדל אם אין תמונה
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    const [street, street_numberAndCity] = user.address.split(',');
    const [street_number, city] = street_numberAndCity.trim().split(' ');

    setUpdatedUserData({
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      birthDate: user.birthDate,
      street: street.trim(),
      street_number: street_number.trim(),
      city: city.trim(),
      email: user.email,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData({ ...updatedUserData, [name]: value });
  };

  const handleSaveChanges = () => {
    EditUser(updatedUserData);
    setEditingUser(null);
  };

  const closeModal = () => {
    setEditingUser(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return 'לא צויין תאריך';
    }

    try {
      const date = new Date(dateString);
      const options = { day: '2-digit', month: 'long', year: 'numeric' };
      return date.toLocaleDateString('he-IL', options);
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };


  return (
    <div className="container mt-5" style={{ maxWidth: '900px', direction: 'rtl' }}> 
      <div className="card shadow-lg p-4">
        <h3 className="text-center">משתמשים רשומים</h3>
        <table className="table table-striped mt-3 text-center">
          <thead>
            <tr>
              <th></th>
              <th>שם משתמש</th>
              <th>שם מלא</th>
              <th>תאריך לידה</th>
              <th>כתובת</th>
              <th>דואר אלקטרוני</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users
                .filter((user) => user.username?.toLowerCase() !== "admin") // Ensure userName exists and exclude "admin"
                .map((user, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={avatars[user.email]}
                        alt="Avatar"
                        className="rounded-circle"
                        width="40"
                        height="40"
                      />
                    </td>
                    <td>{user.username}</td>
                    <td>{`${user.firstName} ${user.lastName}`}</td>
                    <td>{formatDate(user.birthDate)}</td>
                    <td>{`${user.street} ${user.street_number}, ${user.city}`}</td>
                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <button onClick={() => DeleteUser(user.email)} className="btn btn-danger btn-sm mx-1">
                          <i className="fa fa-trash"></i>
                        </button>
                        <button onClick={() => handleEditClick(user)} className="btn btn-primary btn-sm mx-1">
                          <i className="fa fa-edit"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
            ) : (
              <tr><td colSpan="7">לא נמצאו משתמשים</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">עריכת פרטי המשתמש</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3"><label className="form-label">שם פרטי</label><input type="text" name="firstName" value={updatedUserData.firstName} onChange={handleInputChange} className="form-control" /></div>
                <div className="mb-3"><label className="form-label">שם משפחה</label><input type="text" name="lastName" value={updatedUserData.lastName} onChange={handleInputChange} className="form-control" /></div>
                <div className="mb-3"><label className="form-label">תאריך לידה</label><input type="date" name="birthDate" value={updatedUserData.birthDate} onChange={handleInputChange} className="form-control" /></div>
                <div className="mb-3"><label className="form-label">רחוב</label><input type="text" name="street" value={updatedUserData.street} onChange={handleInputChange} className="form-control" /></div>
                <div className="mb-3"><label className="form-label">מספר בית</label><input type="text" name="street_number" value={updatedUserData.street_number} onChange={handleInputChange} className="form-control" /></div>
                <div className="mb-3"><label className="form-label">עיר</label><input type="text" name="city" value={updatedUserData.city} onChange={handleInputChange} className="form-control" /></div>
                <div className="mb-3"><label className="form-label">אימייל</label><input type="email" name="email" value={updatedUserData.email} onChange={handleInputChange} className="form-control" disabled /></div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>סגור</button>
                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>שמור שינויים</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}