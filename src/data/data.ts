import { addDays, addYears, format, parseISO } from "date-fns";
import type { CalculatedValues, Inputs } from "./types";

export function calculateData(inputs: Inputs): CalculatedValues {
  const g26GueltigBis = nextYear(
    inputs.g26,
    getG26GueltigYears(inputs.geburtsdatum)
  );
  const unterweisungGueltigBis = nextYear(inputs.unterweisung);
  const streckendurchgangGueltigBis = nextYear(inputs.streckendurchgang);
  const einsatzUebungGueltigBis = nextYear(inputs.einsatzUebung);

  return {
    g26GueltigBis,
    unterweisungGueltigBis,
    streckendurchgangGueltigBis,
    einsatzUebungGueltigBis,
    tauglichBis: min(
      g26GueltigBis,
      unterweisungGueltigBis,
      streckendurchgangGueltigBis,
      einsatzUebungGueltigBis
    ),
  };
}

function getG26GueltigYears(geburtsdatum: string): number {
  // FIXME G26.3 Gültigkeit abhängig vom Alter.
  return 3;
}

function nextYear(input: string, years: number = 1): string {
  return format(
    addDays(addYears(parseISO(`${input}T00:00:00Z`), years), -1),
    "yyyy-MM-dd"
  );
}

function min<T>(...values: ReadonlyArray<T>): T {
  return values.reduce((min, value) => (value < min ? value : min), values[0]);
}
