import { getMessaging, getToken } from "firebase/messaging";
import { firebase } from "../firebase";

const vapidKey =
  "BC2gPV80rdyGAZuwJ8p45iugPsGqe8piY38khpkGU42oFdUjmritTIUYuwB68w_51htGG1j6PGdKnZB3UBUThVM";

const messaging = getMessaging(firebase);

export async function enableMessaging(): Promise<string> {
  const token = await getToken(messaging, { vapidKey });
  return token;
}
