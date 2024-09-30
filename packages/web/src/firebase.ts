import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";
import { firebaseConfig } from "./firebase-config";

export const firebase = initializeApp(firebaseConfig);

export const firestore = initializeFirestore(firebase, {
  localCache: persistentLocalCache(),
});
