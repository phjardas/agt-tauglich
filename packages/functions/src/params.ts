import { defineString } from "firebase-functions/params";

export const appUrlParam = defineString("APP_URL", {
  default: "https://agt-tauglich.web.app",
});
