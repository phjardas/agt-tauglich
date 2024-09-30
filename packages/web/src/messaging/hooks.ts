import { useCallback, useContext } from "react";
import { Context } from "./context";
import type { DefaultMessagingContext, MessagingContext } from "./types";

export function useMessaging(): MessagingContext {
  const context = useContext(Context);
  if (!context) throw new Error("Missing MessagingProvider");
  return context;
}

export function useEnableNotifications(
  messaging: DefaultMessagingContext
): (userId: string) => Promise<void> {
  return useCallback(async () => {
    await messaging.enable();
  }, [messaging]);
}
