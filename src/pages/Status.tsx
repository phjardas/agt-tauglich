import { Navigate } from "react-router";
import Global from "../components/Global";
import { useData } from "../data";

export default function Status() {
  const data = useData();

  return data ? (
    <Global>
      <pre>{JSON.stringify(data.calculated, null, 2)}</pre>
    </Global>
  ) : (
    <Navigate to="/onboarding" replace />
  );
}
