import type { Settings } from "./Settings";

export interface SettingsRepository {
  loadSettings(): Promise<Settings | undefined>;
  storeSettings(settings: Settings): Promise<void>;
}
