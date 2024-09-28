import { type ReactNode } from "react";
import { DataProvider } from "./data";
import { SettingsProvider } from "./settings";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider>
      <DataProvider>{children}</DataProvider>
    </SettingsProvider>
  );
}
