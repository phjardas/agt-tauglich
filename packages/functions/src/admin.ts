import { applicationDefault, initializeApp } from "firebase-admin/app";

export const firebase = initializeApp({
  credential: applicationDefault(),
});
