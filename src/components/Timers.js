import React from 'react';
import app from '../base';

const Timers = () => {
  return (
    <>
    <h1>Timers</h1>
    <button onClick={() => app.auth().signOut()}>Sign out</button>
    </>
  )
}

export default Timers;