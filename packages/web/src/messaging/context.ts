import { createContext } from "react";
import type { MessagingContext } from "./types";

export const Context = createContext<MessagingContext | undefined>(undefined);
