import { createContext } from "react";
import type { DataContext } from "./types";

export const Context = createContext<DataContext | undefined>(undefined);
