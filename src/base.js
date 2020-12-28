import firebase from 'firebase/app';
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId }  from "./firebaseConfig";

const app = firebase.initializeApp({
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: databaseURL,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId
})

export default app;
