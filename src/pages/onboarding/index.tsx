import { lazy, useState } from "react";
import Global from "../../components/Global";
import { Context, type Onboarding } from "./context";

const Willkommen = lazy(() => import("./Willkommen"));
const Geburtsdatum = lazy(() => import("./Geburtsdatum"));
const G26 = lazy(() => import("./G26"));
const Unterweisung = lazy(() => import("./Unterweisung"));
const Streckendurchgang = lazy(() => import("./Streckendurchgang"));
const EinsatzUebung = lazy(() => import("./EinsatzUebung"));
const Fertig = lazy(() => import("./Fertig"));

const steps = [
  { element: <Willkommen /> },
  { element: <Geburtsdatum /> },
  { element: <G26 /> },
  { element: <Unterweisung /> },
  { element: <Streckendurchgang /> },
  { element: <EinsatzUebung /> },
  { element: <Fertig /> },
];

export default function Onboarding() {
  const [onboarding, setOnboarding] = useState<Onboarding>({ step: 0 });
  const step = steps[onboarding.step];

  return (
    <Context.Provider value={{ onboarding, updateOnboarding: setOnboarding }}>
      <Global>{step.element}</Global>
    </Context.Provider>
  );
}
