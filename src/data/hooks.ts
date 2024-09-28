import { useContext } from "react";
import { Context } from "./context";
import type { Data, DataContext, Inputs } from "./types";

export function useData(): Data | undefined {
  return useDataContext().data;
}

export function useSetInputs(): (inputs: Inputs) => Promise<void> {
  return useDataContext().setInputs;
}

function useDataContext(): DataContext {
  const context = useContext(Context);
  if (!context) throw new Error("Missing DataProvider");
  return context;
}
