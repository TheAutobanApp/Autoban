import React, { useContext, useState, useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase, { config } from '../Firebase';

// Configure FirebaseUI.
export default function Login() {
  const [signedIn, setsignedIn] = useState(false);
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
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
      .onAuthStateChanged((user) => setsignedIn(!!user));

    // returned function will be called on component unmount
    return unregisterAuthObserver();
  }, []);

  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
      />
    </div>
  );
}
