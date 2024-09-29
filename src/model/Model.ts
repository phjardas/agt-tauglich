import {
  ModelEventListener,
  ModelEventPublisher,
  ModelEventTypeMap,
} from "./events";
import { createId } from "./id";
import { ModelEventBus } from "./ModelEventBus";
import { type SettingsUser, storeSettings } from "./settings";
import { SubscribableUser } from "./SubscribableUser";
import type { Inputs, User } from "./types";

export class Model implements ModelEventPublisher {
  readonly deviceId: string;

  #users = new Map<string, SubscribableUser>();
  get users(): ReadonlyArray<User> {
    return [...this.#users.values()];
  }

  #events = new ModelEventBus();

  constructor({
    deviceId,
    users,
  }: {
    deviceId: string;
    users?: ReadonlyArray<SettingsUser>;
  }) {
    this.deviceId = deviceId;
    users?.forEach((user) => this.#addUser(user));
  }

  #addUser(user: SettingsUser): SubscribableUser {
    const subUser = new SubscribableUser(user.id, this.#events);
    this.#users.set(user.id, subUser);
    return subUser;
  }

  getUser(userId: string): User {
    return this.#users.get(userId) ?? this.#addUser({ id: userId });
  }

  async createUser(inputs: Inputs): Promise<User> {
    const userId = createId();
    const user = this.#addUser({ id: userId });
    await user.setInputs(inputs);
    this.#storeSettings();
    return user;
  }

  #storeSettings() {
    storeSettings({ deviceId: this.deviceId, users: this.users });
  }

  addEventListener<K extends keyof ModelEventTypeMap>(
    type: K,
    listener: ModelEventListener<K>
  ): void {
    this.#events.addEventListener(type, listener);
  }

  removeEventListener<K extends keyof ModelEventTypeMap>(
    type: K,
    listener: ModelEventListener<K>
  ): void {
    this.#events.removeEventListener(type, listener);
  }
}
