import type { Settings } from "./types";

const storageKey = "agt-tauglich:settings";

export function loadSettings(): Settings {
  const stored = window.localStorage.getItem(storageKey);

  if (typeof stored === "string") {
    return JSON.parse(stored);
  }

  // create new settings
  const settings: Settings = { users: [] };
  storeSettings(settings);
  return settings;
}

export function storeSettings(settings: Settings) {
  window.localStorage.setItem(storageKey, JSON.stringify(settings));
}
