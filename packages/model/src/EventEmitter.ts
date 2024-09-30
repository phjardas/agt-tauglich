import type { EventListener } from "./EventListener";
import type { EventPublisher } from "./EventPublisher";

export class EventEmitter<EventTypeMap extends {}>
  implements EventPublisher<EventTypeMap>
{
  #listeners = new Map<keyof EventTypeMap, Set<EventListener>>();

  addEventListener<K extends keyof EventTypeMap>(
    type: K,
    listener: EventListener<EventTypeMap[K]>
  ): void {
    let listeners = this.#listeners.get(type);
    if (!listeners) {
      listeners = new Set();
      this.#listeners.set(type, listeners);
    }
    listeners.add(listener as EventListener);
  }

  removeEventListener<K extends keyof EventTypeMap>(
    type: K,
    listener: EventListener<EventTypeMap[K]>
  ): void {
    this.#listeners.get(type)?.delete(listener as EventListener);
  }

  emit<K extends keyof EventTypeMap>(type: K, event: EventTypeMap[K]): void {
    const listeners = this.#listeners.get(type);
    if (listeners) {
      for (const listener of listeners) {
        listener(event);
      }
    }
  }
}
