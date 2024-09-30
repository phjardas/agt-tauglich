import { type ReactNode } from "react";
import { ApplicationProvider } from "./application";
import { MessagingProvider } from "./messaging";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ApplicationProvider>
      <MessagingProvider>{children}</MessagingProvider>
    </ApplicationProvider>
  );
}
