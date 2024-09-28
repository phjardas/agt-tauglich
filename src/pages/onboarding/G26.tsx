import { Alert, Box, TextField, Typography } from "@mui/material";
import Actions from "./Actions";
import { useOnboarding } from "./hooks";

export default function G26() {
  const {
    onboarding: { g26 },
    updateOnboarding,
  } = useOnboarding();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5" component="h1">
        Wann war deine letzte G26.3?
      </Typography>
      <TextField
        name="g26"
        label="Letzte G26.3"
        type="date"
        slotProps={{ inputLabel: { shrink: true } }}
        value={g26 ?? ""}
        onChange={(e) =>
          updateOnboarding((prev) => ({
            ...prev,
            g26: e.target.value,
          }))
        }
        required
      />
      <Alert severity="info">
        Deine personenbezogenen Daten verbleiben auf deinem Gerät und werden
        nicht an uns übertragen.
      </Alert>
      <Actions disabled={!g26?.trim().length} />
    </Box>
  );
}
