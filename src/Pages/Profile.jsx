import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Profile({ setIsLoggedIn }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const userData = state || JSON.parse(sessionStorage.getItem('loggedUser'));
  const [profileImage, setProfileImage] = useState(null);

  const loadImageFromLocalStorage = (email) => {
    const imageKey = `profileImage_${email}`;
    const base64Data = localStorage.getItem(imageKey);
    if (base64Data) {
      return `data:image/jpeg;base64,${base64Data}`;
    }
    return null;
  };


  // Fetch profile image from localStorage
  useEffect(() => {
    if (userData) {
      const image = loadImageFromLocalStorage(userData.email);
      if (image) {
        setProfileImage(image);
      }
    }
  }, [userData]);

  const editDetails = () => {
    navigate('/edit-details', { state: userData });
  };

  const logoutUser = () => {
    sessionStorage.removeItem('loggedUser');
    setIsLoggedIn(false);
    navigate('/', { replace: true });
  };

  useEffect(() => {
    if (!userData) {
      navigate('/', { replace: true });
    }
  }, [userData, navigate]);

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4 text-center" style={{ maxWidth: '500px', borderRadius: '15px', direction: 'rtl' }}>
        <div className="d-flex flex-column align-items-center">
          {profileImage ? (
            <img
              src={profileImage}
              alt="תמונת פרופיל"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
              onError={(e) => e.target.src = '/defaultImageUrl.jpg'}
            />
          ) : (
            <img
              src='/defaultImageUrl.jpg'
              alt="תמונת ברירת מחדל"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
          )}
          <h3 className="mt-3 fw-bold">{userData.firstName} {userData.lastName}</h3>
          <p className="text-muted">
            <i className="fa fa-envelope me-2"></i>{userData.email}
          </p>
          <p>
            <i className="fa fa-map-marker me-2"></i>
            {(userData.street + " " + userData.street_number + " ," + userData.city) || 'לא צוינה כתובת'}
          </p>
          <p>
            <i className="fa fa-calendar me-2"></i>{userData.birthDate || 'לא צויין תאריך'}
          </p>
          <div className="d-flex justify-content-center mt-4">
            <button onClick={editDetails} className="btn btn-secondary me-2">
              עדכון פרטים
            </button>
            <button className="btn btn-primary me-2">
              למשחק
            </button>
            <button onClick={logoutUser} className="btn btn-danger">
              התנתקות
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}