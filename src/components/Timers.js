import React, { useEffect, useState, useContext } from 'react';
import app from '../base';
import { AuthContext } from './Auth';
import firebase from 'firebase';


const Timers = () => {
  const { currentUser } = useContext(AuthContext);

  const [isItMobile, setIsItMobile] = useState(false);
  const [timerMobile, setTimerMobile] = useState(currentUser.timerMobile || 0);
  const [timerDesktop, setTimerDesktop] = useState(currentUser.timerDesktop || 0);

  useEffect(() => {
    checkMobileOrDesktop();

    const interval = setInterval(() => {

      if (isItMobile) {
        setTimerMobile(timerMobile => timerMobile + 1);
        updateDbTime();
      } else {
        setTimerDesktop(timerDesktop => timerDesktop + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  const updateDbTime = () => {
    const userRef = firebase.database().ref('users/' + currentUser.uid);
    const timeSpent = {
      timerMobile: timerMobile,
      timerDesktop: timerDesktop
    }
    userRef.set(timeSpent);
  }


  const checkMobileOrDesktop = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
		if (isMobile) {
      setIsItMobile(true);
      console.log("Mobile timer should work");
		} else {
      setIsItMobile(false);
      console.log("Desktop timer should work");
    }
  }


  const handleLogOut = () => {
    app.auth().signOut();
  }

  return (
    <>
      <button onClick={handleLogOut}>Sign out</button>
      <div>
        <p>Desktop</p>
        <div className="image-container">
          <img src="/stopwatch.png" alt="timer" />
        </div>
        <p>{timerDesktop}</p>
      </div>
      <div>
        <p>Mobile</p>
        <div className="image-container">
          <img src="/stopwatch.png" alt="timer" />
        </div>
        <p>{timerMobile}</p>
      </div>
    </>
  )
}

export default Timers;