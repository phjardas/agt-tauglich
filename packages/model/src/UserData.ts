import { CalculatedValues } from "./CalculatedValues";
import { Inputs } from "./Inputs";

export type UserData = {
  readonly inputs: Inputs;
  readonly calculated: CalculatedValues;
  readonly updatedAt?: Date;
};
