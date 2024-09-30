import type { UserData, UserRepository } from "@agt-tauglich/model";
import { doc, onSnapshot, setDoc, type Firestore } from "firebase/firestore";

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
      (snapshot) =>
        onData(snapshot.exists() ? (snapshot.data() as UserData) : undefined),
      onError
    );
  }

  async setUserData(userId: string, inputs: UserData): Promise<void> {
    await setDoc(this.#userDoc(userId), inputs);
  }

  #userDoc(userId: string) {
    return doc(this.#firestore, "users", userId);
  }
}
