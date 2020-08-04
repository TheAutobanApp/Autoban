import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebase/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyDA-SI4LFzzYaFX4TJchEIbVYSfCr5sIwE",
    authDomain: "autoban-3df2a.firebaseapp.com",
    databaseURL: "https://autoban-3df2a.firebaseio.com",
    projectId: "autoban-3df2a",
    storageBucket: "autoban-3df2a.appspot.com",
    messagingSenderId: "286482193165",
    appId: "1:286482193165:web:d4e012a6ab0d22e8476e44"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;
