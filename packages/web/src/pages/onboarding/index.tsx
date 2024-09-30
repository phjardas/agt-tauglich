import { useState } from "react";
import Global from "../../components/Global";
import { Context, type Onboarding } from "./context";
import EinsatzUebung from "./EinsatzUebung";
import Fertig from "./Fertig";
import G26 from "./G26";
import Geburtsdatum from "./Geburtsdatum";
import Streckendurchgang from "./Streckendurchgang";
import Unterweisung from "./Unterweisung";
import Willkommen from "./Willkommen";

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
