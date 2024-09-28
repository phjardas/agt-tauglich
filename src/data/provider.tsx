import { doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import GlobalLoading from "../components/GlobalLoading";
import { firebase } from "../firebase";
import { useSettings } from "../settings";
import { DataState } from "../types";
import { Context } from "./context";
import { Data } from "./types";

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setLocalData] = useState<DataState<Data | undefined>>({
    state: "loading",
  });
  const { userId } = useSettings();
  const userDoc = useMemo(
    () => doc(getFirestore(firebase), "users", userId),
    [userId]
  );

  useEffect(() => {
    onSnapshot(
      userDoc,
      (snapshot) =>
        setLocalData({ state: "ready", data: snapshot.data() as Data }),
      (error) => setLocalData({ state: "error", error })
    );
  }, [userDoc]);

  const setData = useCallback(
    async (data: Data) => {
      await setDoc(userDoc, data);
    },
    [userDoc]
  );

  if (data.state === "loading") {
    return <GlobalLoading />;
  }

  if (data.state === "error") {
    throw data.error;
  }

  return (
    <Context.Provider value={{ data: data.data, setData }}>
      {children}
    </Context.Provider>
  );
}
