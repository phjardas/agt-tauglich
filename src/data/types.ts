export type Data = {
  geburtsdatum: string;
  g26: string;
  unterweisung: string;
  streckendurchgang: string;
  einsatzUebung: string;
};

export type DataContext = {
  data?: Data;
  setData: (data: Data) => Promise<void>;
};
