import type { UserData } from "./types";

export type UserDataUpdated = {
  userId: string;
  data?: UserData;
  error?: Error;
};

export type ModelEventTypeMap = {
  "user-data-updated": UserDataUpdated;
};

export type ModelEventListener<K extends keyof ModelEventTypeMap> = (
  event: ModelEventTypeMap[K]
) => void;

export type ModelEventPublisher = {
  addEventListener<K extends keyof ModelEventTypeMap>(
    type: K,
    listener: ModelEventListener<K>
  ): void;

  removeEventListener<K extends keyof ModelEventTypeMap>(
    type: K,
    listener: ModelEventListener<K>
  ): void;
};
