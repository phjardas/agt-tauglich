import { Suspense, lazy } from "react";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("./Home"));
const Status = lazy(() => import("./Status"));
const Onboarding = lazy(() => import("./Onboarding"));

const router = createBrowserRouter([
  { index: true, element: <Home /> },
  { path: "status", element: <Status /> },
  { path: "onboarding", element: <Onboarding /> },
]);

export default function Pages() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
