import { lazy, Suspense } from "react";
import GlobalLoading from "./components/GlobalLoading";
import Providers from "./Providers";
import ThemeProvider from "./theme";

const Pages = lazy(() => import("./pages"));

export default function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<GlobalLoading />}>
        <Providers>
          <Pages />
        </Providers>
      </Suspense>
    </ThemeProvider>
  );
}
