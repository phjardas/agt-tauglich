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

export type Data = {
  inputs: Inputs;
  calculated: CalculatedValues;
};

export type DataContext = {
  data?: Data;
  setInputs: (inputs: Inputs) => Promise<void>;
};
