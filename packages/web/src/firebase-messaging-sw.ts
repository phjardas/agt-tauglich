import { getMessaging } from "firebase/messaging/sw";
import { firebase } from "./firebase";

getMessaging(firebase);
