import { lazy, Suspense } from "react";
import Providers from "./Providers";

const Pages = lazy(() => import("./pages"));

export default function App() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <Providers>
        <Pages />
      </Providers>
    </Suspense>
  );
}
