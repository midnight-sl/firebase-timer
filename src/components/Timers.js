import React, { useEffect, useState, useContext } from 'react';
import app from '../base';
import { AuthContext } from './Auth';
import firebase from 'firebase';
import '../styles/timers.css';



const Timers = () => {
  const { currentUser, userSnap } = useContext(AuthContext);

  const [isItMobile, setIsItMobile] = useState(false);
  const [timerMobile, setTimerMobile] = useState(userSnap.timerMobile);
  const [timerDesktop, setTimerDesktop] = useState(userSnap.timerDesktop);


  useEffect(() => {
    checkMobileOrDesktop();
    
    const interval = setInterval(() => {
      if (isItMobile) {
        setTimerMobile(timerMobile => timerMobile + 1);
        updateDbTime();
      } else {
        setTimerDesktop(timerDesktop => timerDesktop + 1);
        updateDbTime()
      }
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []);


  const updateDbTime = () => {
    const userRef = firebase.database().ref('users/' + currentUser.uid);
    const timeSpent = {
      timerMobile: timerMobile,
      timerDesktop: timerDesktop
    }
    userRef.update(timeSpent);
  }

  const checkMobileOrDesktop = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
		if (isMobile) {
      setIsItMobile(true);
		} else {
      setIsItMobile(false);
    }
  }

  const handleShowTime = (time) => {
    time = Number(time);
    const h = Math.floor(time / 3600);
    const m = Math.floor(time % 3600 / 60);
    const s = Math.floor(time % 3600 % 60);

    const hDisplay = h > 0 ? (h.toString().length === 1 ? `0${h}` : h ) : "00";
    const mDisplay = m > 0 ? (m.toString().length === 1 ? `0${m}` : m ) : "00";
    const sDisplay = s > 0 ? (s.toString().length === 1 ? `0${s}` : s ) : "00";
    return <p className="timer">{`${hDisplay}:${mDisplay}:${sDisplay}`}</p>; 
  }


  const handleLogOut = () => {
    app.auth().signOut();
  }

  return (
    <div className="timers">
      <button onClick={handleLogOut}>Sign out</button>
      <div className="timers-container">
        <div className="desktop box">
          <p className="box-name">Desktop</p>
          <div className="image-container">
            <img src="/stopwatch.png" alt="timer" />
          </div>
          {handleShowTime(timerDesktop)}
        </div>
        <div className="mobile box">
          <p className="box-name">Mobile</p>
          <div className="image-container">
            <img src="/stopwatch.png" alt="timer" />
          </div>
          {handleShowTime(timerMobile)}
        </div>
      </div>
    </div>
  )
}

export default Timers;