import { useContext } from "react";
import { Context } from "./context";
import type { Data, DataContext } from "./types";

export function useData(): Data | undefined {
  return useDataContext().data;
}

export function useUpdateData(): (updater: (data?: Data) => Data) => void {
  return useDataContext().updateData;
}

function useDataContext(): DataContext {
  const context = useContext(Context);
  if (!context) throw new Error("Missing DataProvider");
  return context;
}
