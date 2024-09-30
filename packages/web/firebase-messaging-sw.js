importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js",
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyC70R-uZmWDwG7knzQJNp4bPcIu_-t2ak8",
  authDomain: "agt-tauglich.firebaseapp.com",
  projectId: "agt-tauglich",
  storageBucket: "agt-tauglich.appspot.com",
  messagingSenderId: "832349545260",
  appId: "1:832349545260:web:373bf413fa3c09e82ac289",
});

firebase.messaging();
