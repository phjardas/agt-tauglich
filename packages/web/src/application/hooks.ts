import {
  type Application,
  type User,
  type UserData,
  type UserDataUpdated,
} from "@agt-tauglich/model";
import { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "./ApplicationContext";
import { DataState } from "./types";

export function useApplication(): Application {
  const context = useContext(ApplicationContext);
  if (!context) throw new Error("No application context available");
  return context;
}

export function useUser(userId: string): User {
  return useApplication().getUser(userId);
}

export function useUserData(user: User): DataState<UserData | undefined> {
  const [state, setState] = useState<DataState<UserData | undefined>>({
    state: "loading",
  });

  useEffect(() => {
    const listener = (event: UserDataUpdated) => {
      if (event.userId === user.id) {
        if (event.error) {
          setState({ state: "error", error: event.error });
        } else {
          setState({ state: "ready", data: event.data });
        }
      }
    };

    user.addEventListener("user-data-updated", listener);
    user.subscribe();

    return () => {
      user.removeEventListener("user-data-updated", listener);
      user.unsubscribe();
    };
  }, [user]);

  return state;
}
