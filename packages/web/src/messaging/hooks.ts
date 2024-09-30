import { useContext } from "react";
import { Context } from "./context";
import type { MessagingContext } from "./types";

export function useMessaging(): MessagingContext {
  const context = useContext(Context);
  if (!context) throw new Error("Missing MessagingProvider");
  return context;
}
