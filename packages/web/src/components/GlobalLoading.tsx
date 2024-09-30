import { Box, CircularProgress } from "@mui/material";
import Delay from "./Delay";
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
        bgcolor: "primary.dark",
      }}
    >
      <Box sx={{ position: "relative", width: "8rem", height: "8rem", p: 0.5 }}>
        <Delay ms={300}>
          <CircularProgress
            size="100%"
            color="secondary"
            sx={{ position: "absolute", inset: 0 }}
          />
        </Delay>
        <Box component={Logo} sx={{ position: "relative" }} />
      </Box>
    </Box>
  );
}
