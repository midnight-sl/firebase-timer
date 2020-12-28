import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import app from '../base';
import { AuthContext } from './Auth';

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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email@email.com" />
        </label>
        <br />
        <label>
          Password
          <input name="password" type="password" placeholder="Secret password" />
        </label>
        <button type="submit">Login</button>
      </form>
      <a onClick={handleGoToRegister}>Don't have an accout yet? Register</a>
    </div>
  );
};  

export default withRouter(Login);
