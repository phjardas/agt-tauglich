import { useContext } from "react";
import { Context } from "./context";
import type { Settings, SettingsContext } from "./types";

export function useSettings(): Settings {
  return useSettingsContext().settings;
}

export function useUpdateSettings(): (
  updater: (settings: Settings) => Settings
) => void {
  return useSettingsContext().updateSettings;
}

function useSettingsContext(): SettingsContext {
  const context = useContext(Context);
  if (!context) throw new Error("Missing SettingsProvider");
  return context;
}
