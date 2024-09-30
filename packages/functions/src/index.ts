import { setGlobalOptions } from "firebase-functions";
import logger from "firebase-functions/logger";
import { onSchedule } from "firebase-functions/v2/scheduler";

setGlobalOptions({ region: "europe-west1" });

export const sendReminders = onSchedule("0/1 * * * *", () => {
  logger.info("Sending reminders…");
});
