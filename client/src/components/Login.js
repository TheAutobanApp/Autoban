import React, { useContext, useState, useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../Firebase';
import { AutoContext } from './../AutoContext';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

// Configure FirebaseUI
export default function Login() {
  const context = useContext(AutoContext);
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
        context[9](!!user);

        console.log(firebase.auth().currentUser);
      });
    // context[9](true);
    // returned function will be called on component unmount
    return unregisterAuthObserver;
  }, []);

  return (
    <Rodal visible={true}>
      <div>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </Rodal>
  );
}
