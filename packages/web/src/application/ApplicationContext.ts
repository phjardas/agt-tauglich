import { type Application } from "@agt-tauglich/model";
import { createContext } from "react";

export const ApplicationContext = createContext<Application | undefined>(
  undefined
);
