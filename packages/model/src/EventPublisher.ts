import type { EventListener } from "./EventListener";

export type EventPublisher<EventTypeMap extends {}> = {
  addEventListener<K extends keyof EventTypeMap>(
    type: K,
    listener: EventListener<EventTypeMap[K]>
  ): void;

  removeEventListener<K extends keyof EventTypeMap>(
    type: K,
    listener: EventListener<EventTypeMap[K]>
  ): void;
};
