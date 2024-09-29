import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { customAlphabet } from "nanoid";
import { useCallback, useEffect, useState } from "react";
import { firestore } from "../firebase";
import { useUpdateSettings } from "../settings";
import type { DataState } from "../types";
import { calculateData } from "./data";
import type { Data, Inputs } from "./types";

export function useData(userId: string): DataState<Data | undefined> {
  const [data, setData] = useState<DataState<Data | undefined>>({
    state: "loading",
  });

  useEffect(() => {
    onSnapshot(
      getUserDoc(userId),
      (snapshot) => setData({ state: "ready", data: snapshot.data() as Data }),
      (error) => setData({ state: "error", error })
    );
  }, [userId]);

  return data;
}

export async function setInputs(userId: string, inputs: Inputs) {
  await setDoc(getUserDoc(userId), {
    inputs,
    calculated: calculateData(inputs),
  });
}

export function getUserDoc(userId: string) {
  return doc(firestore, "users", userId);
}

const createUserId = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  48
);

export function useCreateUser(): (inputs: Inputs) => Promise<string> {
  const updateSettings = useUpdateSettings();

  return useCallback(async (inputs) => {
    const userId = createUserId();
    await setInputs(userId, inputs);
    updateSettings((settings) => ({
      ...settings,
      users: [...(settings.users ?? []), { id: userId }],
    }));
    return userId;
  }, []);
}
