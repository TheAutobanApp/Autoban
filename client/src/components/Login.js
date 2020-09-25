import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../Firebase';
import Fade from 'react-reveal/Fade';
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
    avatar: '',
    agree: false,
  });
  const [signedIn, setSignedIn] = useState(true);
  const [error, setError] = useState({
    taken: false,
    username: false,
    firstName: false,
    lastName: false,
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
          const currentUser = firebase.auth().currentUser;
          axios
            .get(`/api/user/?email=${currentUser.email}`)
            .then((res) => {
              const user = res.data;
              if (res.data === null) {
                setSignUp({
                  ...signUp,
                  showSignUp: true,
                  email: currentUser.email,
                  avatar: currentUser.photoURL,
                });
              } else {
                context[9]({
                  ...context[8],
                  signedIn: !!user,
                  username: user.username,
                  firstName: user.first_name,
                  lastName: user.last_name,
                  email: user.email,
                  id_user: user.id_user,
                  avatar: user.avatar,
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          setSignedIn(false);
        }
      });
    // context[9](true);
    // returned function will be called on component unmount
    return unregisterAuthObserver;
  }, []);

  const handleSignUp = () => {
    if (
      signUp.agree &&
      signUp.username &&
      signUp.firstName &&
      signUp.lastName &&
      signUp.username.length > 2
    ) {
      // create user
      axios
        .post('/api/user', {
          username: signUp.username,
          first_name: signUp.firstName,
          last_name: signUp.lastName,
          email: signUp.email,
          avatar: signUp.avatar
        })
        .then((res) => {
          // create default Personal team
          axios
            .post('/api/team/', {
              team_name: 'Personal',
              id_user: res.data.id_user,
              team_color: 'violet',
            })
            .then((response) => {
              context[9]({
                ...context[8],
                signedIn: true,
                username: signUp.username,
                firstName: signUp.firstName,
                lastName: signUp.lastName,
                email: signUp.email,
                avatar: signUp.avatar,
                id_user: res.data.id_user,
                teams: context[8].teams.concat([res.data]),
              });
              setSignUp({
                showSignUp: false,
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                avatar: '',
                agree: false,
              });
            });
        })
        .catch(function (error) {
          if (error.response.data === 'user.username') {
            handleSignupError('taken');
          }
        });
    } else if (!signUp.username) {
      handleSignupError('username');
    } else if (!signUp.firstName) {
      handleSignupError('firstName');
    } else if (!signUp.lastName) {
      handleSignupError('lastName');
    } else if (!signUp.agree) {
      handleSignupError('agree');
    }
  };

  const handleSignupError = (error) => {
    switch (error) {
      case 'taken':
        console.log('Username is already taken.');
        setError({ ...error, taken: true });
        setTimeout(() => {
          setError({ ...error, taken: false });
        }, 4000);
        break;
      case 'username':
        console.log('Must enter a valid username.');
        setError({ ...error, username: true });
        setTimeout(() => {
          setError({ ...error, username: false });
        }, 4000);
        break;
      case 'firstName':
        console.log('Must enter a first name.');
        setError({ ...error, firstName: true });
        setTimeout(() => {
          setError({ ...error, firstName: false });
        }, 4000);
        break;
      case 'lastName':
        console.log('Must enter a last name.');
        setError({ ...error, lastName: true });
        setTimeout(() => {
          setError({ ...error, lastName: false });
        }, 4000);
        break;
      case 'agree':
        console.log('Must agree to the terms of service.');
        setError({ ...error, agree: true });
        setTimeout(() => {
          setError({ ...error, agree: false });
        }, 4000);
        break;
      default:
        console.log('Sign up failed.');
    }
  };

  return (
    <Rodal visible={!signedIn} customStyles={{ height: 'fit-content' }}>
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
                minLength={2}
                maxLength={16}
                placeholder="Username"
                onChange={(e) =>
                  setSignUp({ ...signUp, username: e.target.value })
                }
              />
              <Fade bottom collapse when={error.username}>
                <p style={{ color: 'red' }}>Must enter a username!</p>
              </Fade>
            </Form.Field>
            <Form.Field>
              <label>First Name</label>
              <input
                placeholder="First Name"
                onChange={(e) =>
                  setSignUp({ ...signUp, firstName: e.target.value })
                }
              />
              <Fade bottom collapse when={error.firstName}>
                <p style={{ color: 'red' }}>Must enter first name!</p>
              </Fade>
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input
                placeholder="Last Name"
                onChange={(e) =>
                  setSignUp({ ...signUp, lastName: e.target.value })
                }
              />
              <Fade bottom collapse when={error.lastName}>
                <p style={{ color: 'red' }}>Must enter last name!</p>
              </Fade>
            </Form.Field>
            <Form.Field>
              <Checkbox
                label="I agree to the Terms and Conditions"
                onChange={() =>
                  setSignUp({
                    ...signUp,
                    agree: !signUp.agree,
                  })
                }
              />
              <Fade bottom collapse when={error.agree}>
                <p style={{ color: 'red' }}>
                  Must agree to continue!
                </p>
              </Fade>
            </Form.Field>
            <div
              className="flex-row"
              style={{ justifyContent: 'space-between' }}
            >
              <Button type="submit" onClick={handleSignUp}>
                Submit
              </Button>
              <Fade bottom collapse when={error.taken}>
                <p style={{ color: 'red' }}>
                  Username is already taken!
                </p>
              </Fade>
            </div>
          </Form>
        )}
      </div>
    </Rodal>
  );
}
