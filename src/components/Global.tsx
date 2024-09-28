import { Box, Divider, LinearProgress, Link, Paper } from "@mui/material";
import { Suspense, type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorAlert from "./ErrorAlert";
import LinkBehavior from "./LinkBehavior";

export default function Global({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        sx={{
          width: { xs: "100%", sm: "25rem" },
          maxWidth: "100%",
          minHeight: { xs: "100%", sm: "auto" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ flex: 1, p: 4 }}>
          <Suspense fallback={<LinearProgress />}>
            <ErrorBoundary FallbackComponent={ErrorAlert}>
              {children}
            </ErrorBoundary>
          </Suspense>
        </Box>
        <Footer />
      </Paper>
    </Box>
  );
}

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        pb: 1,
      }}
    >
      <Divider />
      <Link
        component={LinkBehavior}
        href="/impressum"
        color="text.secondary"
        fontSize=".8rem"
      >
        Impressum und Datenschutzerklärung
      </Link>
    </Box>
  );
}
