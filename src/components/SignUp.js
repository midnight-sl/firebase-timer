import React, { useCallback } from 'react';
import { withRouter, Redirect } from 'react-router';
import app from '../base';
import firebase from 'firebase';

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { email, password, firstName, lastName } = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);

          const currentUser = app.auth().currentUser;
          const userRef = firebase.database().ref('users/' + currentUser.uid);
          const user = {
            firstName: firstName.value,
            lastName: lastName.value
          }
          userRef.set(user);

        history.push("/");
      } catch (error) {
        alert(`You've got an error while signing up: ${error}`);
      }
  }, [history]);

  const handleGoToLogin = useCallback(
    async event => {
      event.preventDefault();
      history.push("/login");
      return <Redirect to="/login" />
    }, [history]); 

  return (
    <div className="panel sign-up">
      <h1 id="register">Register</h1>
      <form onSubmit={handleSignUp}>
        <label className="sign-up-label"> 
          First Name
          <input name="firstName" type="text" />
        </label>
        <label className="sign-up-label">
          Last Name
          <input name="lastName" type="text" />
        </label>
        <label className="sign-up-label">
          Email
          <input name="email" type="email" />
        </label>
        <label className="sign-up-label">
          Password
          <input name="password" type="password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <a onClick={handleGoToLogin}>Already registered? <span>Log in </span></a>
    </div>
  );
};

export default withRouter(SignUp);
