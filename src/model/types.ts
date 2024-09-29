export type Settings = {
  readonly deviceId: string;
  readonly users: ReadonlyArray<User>;
};

export type User = {
  readonly id: string;
  readonly data: UserData | undefined;
  subscribe: () => void;
  unsubscribe: () => void;
  setInputs: (inputs: Inputs) => Promise<void>;
};

export type Inputs = {
  geburtsdatum: string;
  g26: string;
  unterweisung: string;
  streckendurchgang: string;
  einsatzUebung: string;
};

export type CalculatedValues = {
  g26GueltigBis?: string;
  unterweisungGueltigBis?: string;
  streckendurchgangGueltigBis?: string;
  einsatzUebungGueltigBis?: string;
  tauglichBis?: string;
};

export type UserData = {
  inputs: Inputs;
  calculated: CalculatedValues;
};
