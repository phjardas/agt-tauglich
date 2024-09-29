import { Box, LinearProgress, Paper } from "@mui/material";
import Logo from "./Logo";

export default function GlobalLoading() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          minWidth: "10rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ px: 4, pt: 3, pb: 2 }}>
          <Box component={Logo} sx={{ width: "6rem", color: "primary.main" }} />
        </Box>
        <LinearProgress sx={{ width: "100%" }} />
      </Paper>
    </Box>
  );
}
