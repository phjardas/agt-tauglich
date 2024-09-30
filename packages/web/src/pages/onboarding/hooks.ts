import { useContext } from "react";
import { Context, type OnboardingContext } from "./context";

export function useOnboarding(): OnboardingContext {
  const context = useContext(Context);
  if (!context) throw new Error("Missing OnboardingProvider");
  return context;
}

export function usePreviousStep() {
  const { updateOnboarding } = useOnboarding();
  return () => updateOnboarding((prev) => ({ ...prev, step: prev.step - 1 }));
}

export function useNextStep() {
  const { updateOnboarding } = useOnboarding();
  return () => updateOnboarding((prev) => ({ ...prev, step: prev.step + 1 }));
}
