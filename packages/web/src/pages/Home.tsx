import { Navigate } from "react-router";
import { useApplication } from "../application";

export default function Home() {
  const application = useApplication();

  return (
    <Navigate
      to={
        application.users.length ? `${application.users[0].id}` : "/onboarding"
      }
    />
  );
}
