import {
  ModelEventListener,
  ModelEventPublisher,
  ModelEventTypeMap,
} from "./events";

type GenericListener = (event: unknown) => void;

export class ModelEventBus implements ModelEventPublisher {
  #listeners = new Map<string, Set<GenericListener>>();

  addEventListener<K extends keyof ModelEventTypeMap>(
    type: K,
    listener: ModelEventListener<K>
  ): void {
    let listeners = this.#listeners.get(type);
    if (!listeners) {
      listeners = new Set();
      this.#listeners.set(type, listeners);
    }
    listeners.add(listener as GenericListener);
  }

  removeEventListener<K extends keyof ModelEventTypeMap>(
    type: K,
    listener: ModelEventListener<K>
  ): void {
    this.#listeners.get(type)?.delete(listener as GenericListener);
  }

  emit<K extends keyof ModelEventTypeMap>(
    type: K,
    event: ModelEventTypeMap[K]
  ): void {
    const listeners = this.#listeners.get(type);
    if (listeners) {
      for (const listener of listeners) {
        listener(event);
      }
    }
  }
}
