import { Application } from "./Application";
import { createId } from "./createId";
import type { Settings } from "./Settings";
import type { SettingsRepository } from "./SettingsRepository";
import type { UserRepository } from "./UserRepository";

export class ApplicationFactory {
  #settingsRepository: SettingsRepository;
  #userRepository: UserRepository;

  constructor({
    settingsRepository,
    userRepository,
  }: {
    settingsRepository: SettingsRepository;
    userRepository: UserRepository;
  }) {
    this.#settingsRepository = settingsRepository;
    this.#userRepository = userRepository;
  }

  async createApplication(): Promise<Application> {
    const settings = await this.#loadSettings();
    return new Application({
      deviceId: settings.deviceId,
      userRepository: this.#userRepository,
      settingsRepository: this.#settingsRepository,
    });
  }

  async #loadSettings(): Promise<Settings> {
    let settings = await this.#settingsRepository.loadSettings();
    if (!settings) {
      settings = {
        deviceId: createId(),
        users: [],
      };
      await this.#settingsRepository.storeSettings(settings);
    }
    return settings;
  }
}
