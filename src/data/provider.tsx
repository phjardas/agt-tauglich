import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { firebase } from "../firebase";
import { useSettings } from "../settings";
import { DataState } from "../types";
import { Context } from "./context";
import { Data } from "./types";

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DataState<Data | undefined>>({
    state: "loading",
  });
  const { userId } = useSettings();

  useEffect(() => {
    const userDoc = doc(getFirestore(firebase), "users", userId);
    onSnapshot(
      userDoc,
      (snapshot) => setData({ state: "ready", data: snapshot.data() as Data }),
      (error) => setData({ state: "error", error })
    );
  }, [userId]);

  const updateData = useCallback((updater: (data?: Data) => Data) => {
    setData((prev) => {
      if (prev.state !== "ready") {
        throw new Error(`Data is not ready to be updated.`);
      }

      const next = updater(prev.data);
      return { state: "ready", data: next };
    });
  }, []);

  if (data.state === "loading") {
    return <div>loading…</div>;
  }

  if (data.state === "error") {
    return <div>Error: {data.error.message}</div>;
  }

  return (
    <Context.Provider value={{ data: data.data, updateData }}>
      {children}
    </Context.Provider>
  );
}
