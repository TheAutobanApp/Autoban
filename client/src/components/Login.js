import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../Firebase';
import { AutoContext } from './../AutoContext';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

// Configure FirebaseUI
export default function Login() {
  const context = useContext(AutoContext);
  const [signUp, setSignUp] = useState({
    showSignUp: false,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    agree: false,
  });
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  //
  useEffect(() => {
    let unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          const email = firebase.auth().currentUser.email;
          console.log(email);
          axios
            .get(`/api/user/?email=${email}`)
            .then((res) => {
              console.log(res.data);
              if (res.data === null) {
                setSignUp({
                  ...signUp,
                  showSignUp: true,
                  email: email,
                });
              } else {
                context[9](!!user);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      });
    // context[9](true);
    // returned function will be called on component unmount
    return unregisterAuthObserver;
  }, []);

  const handleSignUp = () => {
    if (signUp.agree) {
      axios
      .post('/api/user', {
        username: signUp.username,
        first_name: signUp.firstName,
        last_name: signUp.lastName,
        email: signUp.email,
      })
      .then((res) => {
        context[9](true);
        setSignUp({
          showSignUp: false,
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          agree: false,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  };

  return (
    <Rodal visible={true} customStyles={{ height: 'fit-content' }}>
      <div>
        {!signUp.showSignUp ? (
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        ) : (
          <Form>
            <Form.Field>
              <label>Username</label>
              <input
                placeholder="Username"
                onChange={(e) =>
                  setSignUp({ ...signUp, username: e.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>First Name</label>
              <input
                placeholder="First Name"
                onChange={(e) =>
                  setSignUp({ ...signUp, firstName: e.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input
                placeholder="Last Name"
                onChange={(e) =>
                  setSignUp({ ...signUp, lastName: e.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                label="I agree to the Terms and Conditions"
                onChange={() => setSignUp({
                  ...signUp,
                  agree: !signUp.agree,
                })}
              />
            </Form.Field>
            <Button type="submit" onClick={handleSignUp}>
              Submit
            </Button>
          </Form>
        )}
      </div>
    </Rodal>
  );
}
