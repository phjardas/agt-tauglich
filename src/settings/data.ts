import { customAlphabet } from "nanoid";
import type { Settings } from "./types";

const storageKey = "agt-tauglich:settings";

const createUserId = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  48
);

export function loadSettings(): Settings {
  const stored = window.localStorage.getItem(storageKey);
  if (typeof stored === "string") return JSON.parse(stored);
  const settings: Settings = { userId: createUserId() };
  storeSettings(settings);
  return settings;
}

export function storeSettings(settings: Settings) {
  window.localStorage.setItem(storageKey, JSON.stringify(settings));
}
