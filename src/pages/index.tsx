import { Suspense, lazy } from "react";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import GlobalLoading from "../components/GlobalLoading";

const Status = lazy(() => import("./Status"));
const Onboarding = lazy(() => import("./onboarding"));
const Impressum = lazy(() => import("./Impressum"));

const router = createBrowserRouter([
  { index: true, element: <Status /> },
  { path: "onboarding", element: <Onboarding /> },
  { path: "impressum", element: <Impressum /> },
]);

export default function Pages() {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
