import { type ReactNode } from "react";
import { MessagingProvider } from "./messaging";
import { SettingsProvider } from "./settings";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider>
      <MessagingProvider>{children}</MessagingProvider>
    </SettingsProvider>
  );
}
