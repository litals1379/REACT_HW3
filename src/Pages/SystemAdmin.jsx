import React, { useState, useContext } from 'react';
import { UserContext } from './UserContextProvider';

export default function SystemAdmin() {
  const { users, DeleteUser, EditUser } = useContext(UserContext);

  const [editingUser, setEditingUser] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    address: '',
    email: ''
  });

  const handleEditClick = (user) => {
    setEditingUser(user);
    setUpdatedUserData({
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      address: (user.street + " " + user.street_number + " ," + user.city),
      email: user.email
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

  return (
    <div className="container mt-5" style={{ maxWidth: '700px', direction: 'rtl' }}>
      <table className="table table-striped mt-3 text-center">
        <thead>
          <tr>
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
            users.map((user, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={user.avatar || '/default-avatar.png'}
                    alt="Avatar"
                    className="rounded-circle"
                    width="40"
                    height="40"
                  />
                </td>
                <td>{(user.firstName + " " + user.lastName)}</td>
                <td>{user.birthDate}</td>
                <td>{(user.street + " " + user.street_number + " ," + user.city)}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  <button
                    onClick={() => DeleteUser(user.email)}
                    className="btn btn-danger mx-1"
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                  <button
                    onClick={() => handleEditClick(user)}
                    className="btn btn-primary mx-1"
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">לא נמצאו משתמשים</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit user modal */}
      {editingUser && (
        <div className="modal show" style={{ display: 'block' }} tabindex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">עריכת פרטי המשתמש</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingUser(null)}
                ></button>
              </div>
              <div className="modal-body">
                <label>שם פרטי</label>
                <input
                  type="text"
                  name="firstName"
                  value={updatedUserData.firstName}
                  onChange={handleInputChange}
                  className="form-control"
                />
                <label>שם משפחה</label>
                <input
                  type="text"
                  name="lastName"
                  value={updatedUserData.lastName}
                  onChange={handleInputChange}
                  className="form-control"
                />

                <label>תאריך לידה</label>
                <input
                  type="date"
                  name="birthDate"
                  value={updatedUserData.birthDate}
                  onChange={handleInputChange}
                  className="form-control"
                />

                <label>כתובת</label>
                <input
                  type="text"
                  name="address"
                  value={updatedUserData.address}
                  onChange={handleInputChange}
                  className="form-control"
                />

                <label>אימייל</label>
                <input
                  type="email"
                  name="email"
                  value={updatedUserData.email}
                  onChange={handleInputChange}
                  className="form-control"
                  disabled
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditingUser(null)}
                >
                  סגור
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveChanges}
                >
                  שמור שינויים
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
