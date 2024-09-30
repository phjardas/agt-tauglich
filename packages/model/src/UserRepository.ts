import type { UserData } from "./UserData";

export interface UserRepository {
  subscribeUser(
    userId: string,
    deviceId: string,
    onData: (data?: UserData) => void,
    onError: (error: Error) => void
  ): () => void;

  setUserData(userId: string, data: UserData): Promise<void>;

  addSubscription(
    userId: string,
    deviceId: string,
    token: string
  ): Promise<void>;

  removeSubscription(userId: string, deviceId: string): Promise<void>;
}
