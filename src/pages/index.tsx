import { Suspense, lazy } from "react";
import { useData } from "../data";

const Onboarding = lazy(() => import("./Onboarding"));
const Status = lazy(() => import("./Status"));

export default function Pages() {
  const data = useData();

  return (
    <Suspense fallback={<div>Loading…</div>}>
      {data ? <Status /> : <Onboarding />}
    </Suspense>
  );
}
