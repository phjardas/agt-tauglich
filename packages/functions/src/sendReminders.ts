import { differenceInCalendarDays, format } from "date-fns";
import { DocumentReference, getFirestore } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";
import * as logger from "firebase-functions/logger";
import { firebase } from "./admin";
import { appUrlParam } from "./params";

const limit = 100;

export async function sendReminders(threshold: Date) {
  logger.info(
    "Sending reminders for threshold %s",
    format(threshold, "yyyy-MM-dd")
  );

  const promises: Array<Promise<unknown>> = [];

  const query = getFirestore(firebase)
    .collection("users")
    .where("calculated.tauglichBis", "==", format(threshold, "yyyy-MM-dd"))
    .limit(limit);

  let offset = 0;
  while (true) {
    console.log("Loading users from offset %d", offset);
    const snapshots = await query.offset(offset).get();
    console.log("Found %d users.", snapshots.size);

    for (const user of snapshots.docs) {
      const res = await sendNotification(user.ref, threshold);
      promises.push(...res);
    }

    if (snapshots.size < limit) break;
  }

  console.log("Waiting for %d promises to resolve.", promises.length);
  await Promise.allSettled(promises);
  return promises.length;
}

async function sendNotification(ref: DocumentReference, threshold: Date) {
  const subscriptions = await ref.collection("subscriptions").get();

  if (subscriptions.size === 0) {
    logger.warn("User %s has no subscriptions", ref.id);
    return [];
  }

  return subscriptions.docs.map((subscription) =>
    sendNotificationToDevice(subscription.data().token, ref.id, threshold)
  );
}

async function sendNotificationToDevice(
  token: string,
  userId: string,
  threshold: Date
) {
  const days = differenceInCalendarDays(threshold, new Date());

  logger.info(
    "Sending reminder for threshold %s to user %s",
    threshold,
    userId
  );

  await getMessaging().send({
    token,
    notification: {
      title: "Deine AGT-Tauglichkeit läuft bald ab!",
      body: `In ${days} Tagen ist es soweit. Bitte vereinbare rechtzeitig einen Termin zum Erhalt deiner Tauglichkeit.`,
      imageUrl: `${appUrlParam.value}/logo-96.png`,
    },
    webpush: {
      fcmOptions: {
        link: `${appUrlParam.value}/${userId}`,
      },
    },
  });
}
