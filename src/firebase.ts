import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyC70R-uZmWDwG7knzQJNp4bPcIu_-t2ak8",
  authDomain: "agt-tauglich.firebaseapp.com",
  projectId: "agt-tauglich",
  storageBucket: "agt-tauglich.appspot.com",
  messagingSenderId: "832349545260",
  appId: "1:832349545260:web:373bf413fa3c09e82ac289",
};

export const firebase = initializeApp(config);

export const firestore = initializeFirestore(firebase, {
  localCache: persistentLocalCache(),
});
