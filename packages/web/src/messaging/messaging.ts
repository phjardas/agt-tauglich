import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebase } from "../firebase";

const vapidKey =
  "BC2gPV80rdyGAZuwJ8p45iugPsGqe8piY38khpkGU42oFdUjmritTIUYuwB68w_51htGG1j6PGdKnZB3UBUThVM";

const messaging = getMessaging(firebase);

onMessage(messaging, (payload) => {
  console.log("Incoming message:", payload);
  const { notification } = payload;
  if (notification) {
    new Notification(notification.title ?? "", notification);
  }
});

export async function getMessagingToken(): Promise<string> {
  return getToken(messaging, { vapidKey });
}
