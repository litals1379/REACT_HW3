import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export default function UserContextProvider(props) {

  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('users')) || []
  );

  const addUser = (user) => {
    console.log('In add User fuync');
    setUsers([...users, user]);
    localStorage.setItem('users', JSON.stringify([...users, user]));
  };

  const DeleteUser = (email) => {
    const updatedUsers = users.filter(user => user.email !== email);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert("המשתמש הוסר בהצלחה!");
  };

  const EditUser = (email) => {
    const updatedUsers = users.filter(user => user.email !== email);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert("המשתמש עודכן בהצלחה!");
  };

  return (
    <UserContext.Provider value={{ users, DeleteUser, EditUser,addUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
