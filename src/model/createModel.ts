import { createId } from "./id";
import { Model } from "./Model";
import { loadSettings } from "./settings";

export function createModel(): Model {
  const settings = loadSettings() ?? { deviceId: createId() };
  return new Model(settings);
}
