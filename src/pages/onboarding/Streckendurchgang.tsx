import { Box, TextField, Typography } from "@mui/material";
import Actions from "./Actions";
import DatenschutzInfo from "./DatenschutzInfo";
import { useOnboarding } from "./hooks";

export default function Streckendurchgang() {
  const {
    onboarding: { streckendurchgang },
    updateOnboarding,
  } = useOnboarding();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5" component="h1">
        Wann war deine letzter Streckendurchgang?
      </Typography>
      <Typography>
        Wenn du noch keinen Streckendurchgang als Atenschutzgeräteträger
        hattest, trag das Datum des Endes deines AGT-Lehrgangs ein.
      </Typography>
      <TextField
        name="streckendurchgang"
        label="Letzter Streckendurchgang"
        type="date"
        slotProps={{ inputLabel: { shrink: true } }}
        value={streckendurchgang ?? ""}
        onChange={(e) =>
          updateOnboarding((prev) => ({
            ...prev,
            streckendurchgang: e.target.value,
          }))
        }
        required
      />
      <DatenschutzInfo />
      <Actions disabled={!streckendurchgang?.trim().length} />
    </Box>
  );
}
