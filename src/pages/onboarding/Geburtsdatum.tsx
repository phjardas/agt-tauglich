import { Box, TextField, Typography } from "@mui/material";
import Actions from "./Actions";
import DatenschutzInfo from "./DatenschutzInfo";
import { useOnboarding } from "./hooks";

export default function Geburtsdatum() {
  const {
    onboarding: { geburtsdatum },
    updateOnboarding,
  } = useOnboarding();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5" component="h1">
        Wann bist du geboren?
      </Typography>
      <Typography>
        Wir benötigen dein Geburtsdatum, um die Gültigkeitsdauer deiner
        G26.3-Untersuchung abhängig von deinem Alter zu berechnen.
      </Typography>
      <TextField
        name="geburtsdatum"
        label="Geburtsdatum"
        type="date"
        required
        slotProps={{ inputLabel: { shrink: true } }}
        value={geburtsdatum ?? ""}
        onChange={(e) =>
          updateOnboarding((prev) => ({
            ...prev,
            geburtsdatum: e.target.value,
          }))
        }
      />
      <DatenschutzInfo />
      <Actions disabled={!geburtsdatum?.trim()?.length} />
    </Box>
  );
}
