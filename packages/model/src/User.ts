import { calculateValues } from "./calculateValues";
import { EventEmitter } from "./EventEmitter";
import type { EventListener } from "./EventListener";
import type { EventPublisher } from "./EventPublisher";
import type { Inputs } from "./Inputs";
import type { UserData } from "./UserData";
import type { UserRepository } from "./UserRepository";

export type UserDataUpdated = {
  userId: string;
  data?: UserData;
  error?: Error;
};

export type UserEventTypeMap = {
  "user-data-updated": UserDataUpdated;
};

export class User implements EventPublisher<UserEventTypeMap> {
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

  #repository: UserRepository;
  #events = new EventEmitter<UserEventTypeMap>();
  #subscriptionsCount: number = 0;
  #unsubscribe?: () => void;

  constructor(
    readonly id: string,
    readonly deviceId: string,
    repository: UserRepository
  ) {
    this.#repository = repository;
  }

  async setInputs(inputs: Inputs) {
    await this.#repository.setUserData(this.id, {
      inputs,
      calculated: calculateValues(inputs),
    });
  }

  subscribe() {
    if (this.#subscriptionsCount === 0) {
      this.#unsubscribe = this.#repository.subscribeUser(
        this.id,
        this.deviceId,
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

  async enableNotifications(token: string) {
    this.#repository.addSubscription(this.id, this.deviceId, token);
  }

  async disableNotifications() {
    await this.#repository.removeSubscription(this.id, this.deviceId);
  }

  addEventListener<K extends "user-data-updated">(
    type: K,
    listener: EventListener<UserEventTypeMap[K]>
  ): void {
    this.#events.addEventListener(type, listener);
  }

  removeEventListener<K extends "user-data-updated">(
    type: K,
    listener: EventListener<UserEventTypeMap[K]>
  ): void {
    this.#events.removeEventListener(type, listener);
  }
}
