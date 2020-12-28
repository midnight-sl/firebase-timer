import React, { useCallback } from 'react';
import { withRouter, Redirect } from 'react-router';
import app from '../base';
import firebase from 'firebase/app';

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { email, password, firstName, lastName } = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);

          // const user = app.auth().currentUser;
          // firebase.database().ref("users").child(user.uid).set({
          //   firstName: firstName.value,
          //   lastName: lastName.value
          // })


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
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSignUp}>
        <label>
          First Name
          <input name="firstName" type="text" placeholder="Your First Name" />
        </label>
        <br />
        <label>
          Last Name
          <input name="lastName" type="text" placeholder="Your Last Name" />
        </label>
        <br />
        <label>
          Email
          <input name="email" type="email" placeholder="Email@email.com" />
        </label>
        <br />
        <label>
          Password
          <input name="password" type="password" placeholder="Secret password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <a onClick={handleGoToLogin}>Already registered? Log in</a>
    </div>
  );
};

export default withRouter(SignUp);
