import logger from "firebase-functions/logger";
import { onDocumentCreated } from "firebase-functions/v2/firestore";

export const sendWelcomeMessage = onDocumentCreated(
  "users/{userId}/subscriptions/{deviceId}",
  (event) => {
    const { userId, deviceId } = event.params;
    logger.info(
      "Sending welcome message to user %s on device %s",
      userId,
      deviceId
    );
  }
);
