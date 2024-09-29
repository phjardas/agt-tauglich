import { createContext, useContext, useEffect, useState } from "react";
import {
  createModel,
  type Model,
  type User,
  type UserData,
  type UserDataUpdated,
} from "../model";
import { DataState } from "../types";

const ModelContext = createContext<Model>(createModel());

export function useModel(): Model {
  return useContext(ModelContext);
}

export function useUser(userId: string): User {
  return useModel().getUser(userId);
}

export function useUserData(user: User): DataState<UserData | undefined> {
  const [state, setState] = useState<DataState<UserData | undefined>>({
    state: "loading",
  });
  const model = useModel();

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

    model.addEventListener("user-data-updated", listener);
    user.subscribe();

    return () => {
      model.removeEventListener("user-data-updated", listener);
      user.unsubscribe();
    };
  }, [model, user]);

  return state;
}
