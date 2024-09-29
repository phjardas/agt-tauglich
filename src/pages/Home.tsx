import { Navigate } from "react-router";
import { useModel } from "../application";

export default function Home() {
  const model = useModel();

  return (
    <Navigate
      to={model.users.length ? `${model.users[0].id}` : "/onboarding"}
    />
  );
}
