import { createContext } from "react";

export type Onboarding = {
  step: number;
  geburtsdatum?: string;
  g26?: string;
  unterweisung?: string;
  streckendurchgang?: string;
  einsatzUebung?: string;
};

export type OnboardingContext = {
  onboarding: Onboarding;
  updateOnboarding: (updater: (onboarding: Onboarding) => Onboarding) => void;
};

export const Context = createContext<OnboardingContext | undefined>(undefined);
