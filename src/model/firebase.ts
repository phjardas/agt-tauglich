import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import type { UserData } from "./types";

export function userDoc(userId: string) {
  return doc(firestore, "users", userId);
}

export function subscribeUser(
  userId: string,
  onData: (data?: UserData) => void,
  onError: (error: Error) => void
): () => void {
  return onSnapshot(
    userDoc(userId),
    (snapshot) => {
      onData(snapshot.exists() ? (snapshot.data() as UserData) : undefined);
    },
    onError
  );
}

export async function setUserData(userId: string, inputs: UserData) {
  await setDoc(userDoc(userId), inputs);
}
