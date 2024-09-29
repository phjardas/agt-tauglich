import { Navigate } from "react-router";
import { useSettings } from "../settings";

export default function Home() {
  const settings = useSettings();
  console.log("settings:", settings);

  return (
    <Navigate
      to={settings.users.length ? `${settings.users[0].id}` : "/onboarding"}
    />
  );
}
