import { lazy, Suspense } from "react";
import { DataProvider, useData } from "./data";
import { SettingsProvider } from "./settings";

const Onboarding = lazy(() => import("./Onboarding"));
const Status = lazy(() => import("./Status"));

export default function App() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <SettingsProvider>
        <DataProvider>
          <Main />
        </DataProvider>
      </SettingsProvider>
    </Suspense>
  );
}

function Main() {
  const data = useData();
  return data ? <Status /> : <Onboarding />;
}
