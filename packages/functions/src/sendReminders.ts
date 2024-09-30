import * as logger from "firebase-functions/logger";
import { onSchedule } from "firebase-functions/v2/scheduler";

export const sendReminders = onSchedule("0/1 * * * *", () => {
  logger.info("Sending reminders…");
});
