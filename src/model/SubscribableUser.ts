import { calculateData } from "./calculated";
import { setUserData, subscribeUser } from "./firebase";
import { type ModelEventBus } from "./ModelEventBus";
import type { Inputs, User, UserData } from "./types";

export class SubscribableUser implements User {
  #loading: boolean = true;
  get loading(): boolean {
    return this.#loading;
  }

  #data: UserData | undefined;
  get data(): UserData | undefined {
    return this.#data;
  }

  #error: Error | undefined;
  get error(): Error | undefined {
    return this.#error;
  }

  #events: ModelEventBus;
  #subscriptionsCount: number = 0;
  #unsubscribe?: () => void;

  constructor(
    readonly id: string,
    events: ModelEventBus
  ) {
    this.#events = events;
  }

  async setInputs(inputs: Inputs) {
    await setUserData(this.id, {
      inputs,
      calculated: calculateData(inputs),
    });
  }

  subscribe() {
    if (this.#subscriptionsCount === 0) {
      this.#unsubscribe = subscribeUser(
        this.id,
        (data) => {
          this.#loading = false;
          this.#data = data;
          this.#events.emit("user-data-updated", { userId: this.id, data });
        },
        (error) => {
          this.#loading = false;
          this.#error = error;
          this.#events.emit("user-data-updated", { userId: this.id, error });
        }
      );
    }

    this.#subscriptionsCount++;
  }

  unsubscribe() {
    this.#subscriptionsCount--;

    if (this.#subscriptionsCount === 0) {
      this.#unsubscribe?.();
    }
  }
}
