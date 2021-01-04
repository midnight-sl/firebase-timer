import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import app from '../base';
import { AuthContext } from './Auth';
import '../styles/logIn.css'

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(`You've got an error: ${error}`);
      }
    }, [history]);

  const handleGoToRegister = useCallback(
    async event => {
      event.preventDefault();
      history.push("/signup");
      return <Redirect to="/signup" />
    }, [history]); 

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />
  }


  return (
    <div className="panel login">
      <h1 id="login">Login</h1>
      <form onSubmit={handleLogin}>
        <label className="login-label">
          Email
          <input name="email" type="email" />
        </label>
        <label className="login-label">
          Password
          <input name="password" type="password" />
        </label>
        <button type="submit">Login</button>
      </form>
      <a onClick={handleGoToRegister}>Don't have an accout yet? <span>Register</span></a>
    </div>
  );
};  

export default withRouter(Login);
