import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {
  const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser')) || {};

  if (!loggedUser.role || loggedUser.role !== roleRequired) {
    alert("אין לך הרשאה להיכנס לעמוד זה.");
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;