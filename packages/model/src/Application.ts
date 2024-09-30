import { createId } from "./createId";
import type { Inputs } from "./Inputs";
import type { SettingsRepository } from "./SettingsRepository";
import { User } from "./User";
import type { UserRepository } from "./UserRepository";

export class Application {
  readonly deviceId: string;

  #users = new Map<string, User>();
  get users(): ReadonlyArray<User> {
    return [...this.#users.values()];
  }

  #userRepository: UserRepository;
  #settingsRepository: SettingsRepository;

  constructor({
    deviceId,
    users,
    userRepository,
    settingsRepository,
  }: {
    deviceId: string;
    users?: ReadonlyArray<{ id: string }>;
    userRepository: UserRepository;
    settingsRepository: SettingsRepository;
  }) {
    this.deviceId = deviceId;
    this.#userRepository = userRepository;
    this.#settingsRepository = settingsRepository;
    users?.forEach((user) => this.#addUser(user));
  }

  #addUser(user: { id: string }): User {
    const subUser = new User(user.id, this.deviceId, this.#userRepository);
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
    await this.#storeSettings();
    return user;
  }

  async #storeSettings() {
    await this.#settingsRepository.storeSettings({
      deviceId: this.deviceId,
      users: this.users,
    });
  }
}
