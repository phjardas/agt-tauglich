import { Alert, Box, TextField, Typography } from "@mui/material";
import Actions from "./Actions";
import { useOnboarding } from "./hooks";

export default function Unterweisung() {
  const {
    onboarding: { unterweisung },
    updateOnboarding,
  } = useOnboarding();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5" component="h1">
        Wann war deine letzte Unterweisung?
      </Typography>
      <Typography>
        Wenn du noch keine Unterweisung als Atenschutzgeräteträger hattest, trag
        das Datum des Endes deines AGT-Lehrgangs ein.
      </Typography>
      <TextField
        name="unterweisung"
        label="Letzte Unterweisung"
        type="date"
        slotProps={{ inputLabel: { shrink: true } }}
        value={unterweisung ?? ""}
        onChange={(e) =>
          updateOnboarding((prev) => ({
            ...prev,
            unterweisung: e.target.value,
          }))
        }
        required
      />
      <Alert severity="info">
        Deine personenbezogenen Daten verbleiben auf deinem Gerät und werden
        nicht an uns übertragen.
      </Alert>
      <Actions disabled={!unterweisung?.trim().length} />
    </Box>
  );
}
