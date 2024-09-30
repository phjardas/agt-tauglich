import type { UserData, UserRepository } from "@agt-tauglich/model";
import {
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type Firestore,
  type Timestamp,
} from "firebase/firestore";

export class FirestoreUserRepository implements UserRepository {
  readonly #firestore: Firestore;

  #unsubscribes: Array<() => void> = [];
  #current: UserData | undefined = undefined;

  constructor(firestore: Firestore) {
    this.#firestore = firestore;
  }

  subscribeUser(
    userId: string,
    deviceId: string,
    onData: (data?: UserData) => void,
    onError: (error: Error) => void
  ): () => void {
    const setData = (data: Partial<UserData>) => {
      this.#current = { ...this.#current, ...data } as UserData;
      onData(this.#current);
    };

    this.#unsubscribes.push(
      onSnapshot(
        this.#userDoc(userId),
        (snapshot) => {
          if (snapshot.exists()) {
            const { updatedAt, ...data } = snapshot.data({
              serverTimestamps: "estimate",
            }) as Omit<UserData, "updatedAt"> & { updatedAt?: Timestamp };

            setData({
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
      )
    );

    this.#unsubscribes.push(
      onSnapshot(
        this.#subscriptionDoc(userId, deviceId),
        (snapshot) => setData({ subscribed: snapshot.exists() }),
        onError
      )
    );

    return () => {
      for (const unsubscribe of this.#unsubscribes) {
        unsubscribe();
      }
      this.#unsubscribes = [];
    };
  }

  async setUserData(userId: string, data: UserData): Promise<void> {
    await setDoc(this.#userDoc(userId), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }

  async addSubscription(
    userId: string,
    deviceId: string,
    token: string
  ): Promise<void> {
    await setDoc(this.#subscriptionDoc(userId, deviceId), { token });
  }

  async removeSubscription(userId: string, deviceId: string): Promise<void> {
    await deleteDoc(this.#subscriptionDoc(userId, deviceId));
  }

  #userDoc(userId: string) {
    return doc(this.#firestore, "users", userId);
  }

  #subscriptionDoc(userId: string, deviceId: string) {
    return doc(this.#userDoc(userId), "subscriptions", deviceId);
  }
}
