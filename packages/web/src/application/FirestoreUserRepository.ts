import type { UserData, UserRepository } from "@agt-tauglich/model";
import {
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type Firestore,
  type Timestamp,
} from "firebase/firestore";

export class FirestoreUserRepository implements UserRepository {
  readonly #firestore: Firestore;

  constructor(firestore: Firestore) {
    this.#firestore = firestore;
  }

  subscribeUser(
    userId: string,
    onData: (data?: UserData) => void,
    onError: (error: Error) => void
  ): () => void {
    return onSnapshot(
      this.#userDoc(userId),
      (snapshot) => {
        if (snapshot.exists()) {
          const { updatedAt, ...data } = snapshot.data({
            serverTimestamps: "estimate",
          }) as Omit<UserData, "updatedAt"> & { updatedAt?: Timestamp };

          onData({
            ...data,
            updatedAt: updatedAt
              ? new Date(updatedAt.seconds * 1000)
              : undefined,
          });
        } else {
          onData(undefined);
        }
      },
      onError
    );
  }

  async setUserData(userId: string, data: UserData): Promise<void> {
    await setDoc(this.#userDoc(userId), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }

  #userDoc(userId: string) {
    return doc(this.#firestore, "users", userId);
  }
}
