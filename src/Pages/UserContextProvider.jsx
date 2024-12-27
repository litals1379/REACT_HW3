import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export default function UserContextProvider(props) {

  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('users')) || []
  );

  const DeleteUser = (email) => {
    const updatedUsers = users.filter(user => user.email !== email);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert("המשתמש הוסר בהצלחה!");
  };

  const EditUser = (updatedUserData) => {
    const updatedUsers = users.map(user =>
      user.email === updatedUserData.email ? updatedUserData : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert("המשתמש עודכן בהצלחה!");
  };

  return (
    <UserContext.Provider value={{ users, DeleteUser, EditUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
