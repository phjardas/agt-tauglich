export type Settings = {
  users: ReadonlyArray<User>;
};

export type User = {
  id: string;
};

export type SettingsContext = {
  settings: Settings;
  updateSettings: (updater: (settings: Settings) => Settings) => void;
};
