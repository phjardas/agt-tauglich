import { Settings, type SettingsRepository } from "@agt-tauglich/model";

export class LocalStorageSettingsRepository implements SettingsRepository {
  readonly #storageKey: string;

  constructor(storageKey: string) {
    this.#storageKey = storageKey;
  }

  async loadSettings(): Promise<Settings | undefined> {
    const settings = localStorage.getItem(this.#storageKey);
    if (settings) return JSON.parse(settings);
  }

  async storeSettings(settings: Settings): Promise<void> {
    localStorage.setItem(this.#storageKey, JSON.stringify(settings));
  }
}
