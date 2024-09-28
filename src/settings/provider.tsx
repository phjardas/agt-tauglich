import { useCallback, useMemo, useState, type ReactNode } from "react";
import { Context } from "./context";
import { loadSettings, storeSettings } from "./data";
import { Settings, SettingsContext } from "./types";

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState(loadSettings());

  const updateSettings = useCallback(
    (updater: (settings: Settings) => Settings) => {
      setSettings((prev) => {
        const next = updater(prev);
        storeSettings(next);
        return next;
      });
    },
    []
  );

  const context: SettingsContext = useMemo(
    () => ({ settings, updateSettings }),
    [settings, updateSettings]
  );

  return <Context.Provider value={context}>{children}</Context.Provider>;
}
