import { useEffect, useState, type ReactNode } from "react";
import { Context } from "./context";
import { enableMessaging } from "./messaging";
import type { GrantedMessagingContext, MessagingContext } from "./types";

export function MessagingProvider({ children }: { children: ReactNode }) {
  const [context, setContext] = useState<MessagingContext>({
    state: "loading",
  });

  useEffect(() => {
    calculateContext(setContext);
  }, []);

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

function calculateContext(setContext: (context: MessagingContext) => void) {
  switch (Notification.permission) {
    case "default":
      return setContext({
        state: "default",
        enable: async () => {
          try {
            await enableMessaging();
            getGrantedContext().then(setContext);
          } catch (error) {
            console.error(error);
            calculateContext(setContext);
          }
        },
      });

    case "denied":
      return setContext({ state: "denied" });

    case "granted":
      return getGrantedContext().then(setContext);
  }
}

async function getGrantedContext(): Promise<GrantedMessagingContext> {
  return { state: "granted" };
}
