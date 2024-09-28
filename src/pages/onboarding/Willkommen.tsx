import { ArrowForward } from "@mui/icons-material";
import { Alert, Box, Button, Typography } from "@mui/material";
import { useNextStep } from "./hooks";

export default function Willkommen() {
  const nextStep = useNextStep();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" component="h1">
        Herzlich Willkommen!
      </Typography>
      <Typography>
        Mit dieser App kannst du deine Tauglichkeit als Atemschutzgeräteträger
        der Feuerwehr nach der FwDV 7 selbst überwachen.
      </Typography>
      <Alert severity="info">
        Deine personenbezogenen Daten verbleiben auf deinem Gerät und werden
        nicht an uns übertragen.
      </Alert>
      <Button
        variant="contained"
        size="large"
        endIcon={<ArrowForward />}
        onClick={nextStep}
      >
        Los geht's!
      </Button>
    </Box>
  );
}
