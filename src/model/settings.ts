export type SettingsUser = {
  id: string;
};

export type Settings = {
  deviceId: string;
  users?: ReadonlyArray<SettingsUser>;
};

const storageKey = "agt-tauglich:settings";

export function loadSettings(): Settings | undefined {
  const stored = window.localStorage.getItem(storageKey);
  return typeof stored === "string" ? JSON.parse(stored) : undefined;
}

export function storeSettings(settings: Settings) {
  window.localStorage.setItem(storageKey, JSON.stringify(settings));
}
