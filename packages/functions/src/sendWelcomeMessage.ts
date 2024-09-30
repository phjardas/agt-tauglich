import { getMessaging } from "firebase-admin/messaging";
import * as logger from "firebase-functions/logger";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { firebase } from "./admin";

export const sendWelcomeMessage = onDocumentCreated(
  "users/{userId}/subscriptions/{deviceId}",
  (event) => {
    const { userId, deviceId } = event.params;
    const data = event.data?.data();
    if (!data) return;

    logger.info(
      "Sending welcome message to user %s on device %s",
      userId,
      deviceId
    );

    const { token } = data;

    getMessaging(firebase).send({
      token,
      notification: {
        title: "Benachrichtigungen aktiviert",
        body: "Ab sofort erhälst du rechtzeitig vor Ablauf deiner Tauglichkeit eine Benachrichtigung.",
      },
    });
  }
);
