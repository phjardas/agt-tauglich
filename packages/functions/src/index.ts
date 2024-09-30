import { setGlobalOptions } from "firebase-functions";

setGlobalOptions({ region: "europe-west1" });

export * from "./sendReminders";
export * from "./sendWelcomeMessage";
