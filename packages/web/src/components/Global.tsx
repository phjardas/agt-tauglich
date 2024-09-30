import {
  Box,
  Divider,
  LinearProgress,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { Suspense, type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { version } from "../config";
import ErrorAlert from "./ErrorAlert";
import Logo from "./Logo";

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
          display: "flex",
          flexDirection: "column",
          py: 1,
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="caption">powered by</Typography>
          <Link href="https://rescuetablet.de/" target="_blank" color="inherit">
            <Box
              component={Logo}
              sx={{ width: "8rem" }}
              aria-label="rescueTABLET"
            />
          </Link>
        </Box>
        <Typography variant="caption" textAlign="center">
          <Link
            href="https://rescuetablet.de/impressum"
            target="_blank"
            color="inherit"
          >
            Impressum
          </Link>
          {" | "}
          <Link
            href="https://rescuetablet.de/datenschutz"
            target="_blank"
            color="inherit"
          >
            Datenschutz
          </Link>
          {" | "}
          {version}
        </Typography>
      </Box>
    </>
  );
}
