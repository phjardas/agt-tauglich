import { useEffect, useState, type ReactNode } from "react";
import { Context } from "./context";
import { getMessagingToken } from "./messaging";
import type {
  DeniedMessagingContext,
  GrantedMessagingContext,
  MessagingContext,
} from "./types";

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
        getToken: async () => {
          const granted = await getGrantedContext();
          setContext(granted);
          if (granted.state === "denied") throw granted.error;
          return granted.getToken();
        },
      });

    case "denied":
      return setContext({ state: "denied" });

    case "granted":
      getGrantedContext().then(setContext);
  }
}

async function getGrantedContext(): Promise<
  GrantedMessagingContext | DeniedMessagingContext
> {
  try {
    const token = await getMessagingToken();
    return { state: "granted", getToken: async () => token };
  } catch (error) {
    console.error(error);
    return { state: "denied", error: error as Error };
  }
}
