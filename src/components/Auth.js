import React, { useEffect, useState } from 'react';
import app from '../base';
import firebase from 'firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userSnap, setUserSnap] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
      if (currentUser) {
        firebase.database().ref('users/' + currentUser.uid).once("value", snap => setUserSnap(snap.val()) ); 
      } 
    });
  }, []);

  if (pending) {
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, userSnap }}
    >
      {children}
    </AuthContext.Provider>
  )
}
