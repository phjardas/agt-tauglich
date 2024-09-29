import { type ReactNode } from "react";
import { SettingsProvider } from "./settings";

export default function Providers({ children }: { children: ReactNode }) {
  return <SettingsProvider>{children}</SettingsProvider>;
}
