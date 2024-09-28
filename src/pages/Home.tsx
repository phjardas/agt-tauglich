import { Navigate } from "react-router";
import { useData } from "../data";

export default function Home() {
  const data = useData();
  return <Navigate to={data ? "/status" : "/onboarding"} />;
}
