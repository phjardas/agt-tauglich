export type Settings = {
  userId: string;
};

export type SettingsContext = {
  settings: Settings;
  updateSettings: (updater: (settings: Settings) => Settings) => void;
};
