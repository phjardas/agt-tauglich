import { createContext } from "react";
import type { SettingsContext } from "./types";

export const Context = createContext<SettingsContext | undefined>(undefined);
