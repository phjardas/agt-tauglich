import { Box, Divider, LinearProgress, Link, Paper } from "@mui/material";
import { Suspense, type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { version } from "../config";
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
          height: { xs: "100%", sm: "auto" },
          maxHeight: { xs: "100%", sm: "auto" },
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
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
    <>
      <Divider />
      <Box
        component="footer"
        sx={{
          width: "100%",
          textAlign: "center",
          py: 1,
          color: "text.secondary",
          fontSize: ".8rem",
        }}
      >
        <Link component={LinkBehavior} href="/impressum" color="inherit">
          Impressum und Datenschutzerklärung
        </Link>
        {" | "}
        {version}
      </Box>
    </>
  );
}
