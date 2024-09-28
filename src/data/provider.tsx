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
import { calculateData } from "./data";
import type { Data, Inputs } from "./types";

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DataState<Data | undefined>>({
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
      (snapshot) => setData({ state: "ready", data: snapshot.data() as Data }),
      (error) => setData({ state: "error", error })
    );
  }, [userDoc]);

  const setInputs = useCallback(
    async (inputs: Inputs) => {
      await setDoc(userDoc, { inputs, calculated: calculateData(inputs) });
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
    <Context.Provider value={{ data: data.data, setInputs }}>
      {children}
    </Context.Provider>
  );
}
