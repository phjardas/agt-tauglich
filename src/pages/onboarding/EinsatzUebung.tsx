import { Alert, Box, TextField, Typography } from "@mui/material";
import Actions from "./Actions";
import { useOnboarding } from "./hooks";

export default function EinsatzUebung() {
  const {
    onboarding: { einsatzUebung },
    updateOnboarding,
  } = useOnboarding();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5" component="h1">
        Wann war dein letzter Einsatz oder deine letzte Einsatz-Übung?
      </Typography>
      <Typography>
        Wenn du noch keinen Einsatz oder Übung als Atenschutzgeräteträger
        hattest, trag das Datum des Endes deines AGT-Lehrgangs ein.
      </Typography>
      <TextField
        name="einsatzUebung"
        label="Letzter Einsatz oder Übung"
        type="date"
        slotProps={{ inputLabel: { shrink: true } }}
        value={einsatzUebung ?? ""}
        onChange={(e) =>
          updateOnboarding((prev) => ({
            ...prev,
            einsatzUebung: e.target.value,
          }))
        }
        required
      />
      <Alert severity="info">
        Deine personenbezogenen Daten verbleiben auf deinem Gerät und werden
        nicht an uns übertragen.
      </Alert>
      <Actions disabled={!einsatzUebung?.trim().length} />
    </Box>
  );
}
