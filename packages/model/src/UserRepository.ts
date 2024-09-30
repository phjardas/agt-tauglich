import type { UserData } from "./UserData";

export interface UserRepository {
  subscribeUser(
    userId: string,
    onData: (data?: UserData) => void,
    onError: (error: Error) => void
  ): () => void;

  setUserData(userId: string, data: UserData): Promise<void>;
}
