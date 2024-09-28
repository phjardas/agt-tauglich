import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useNextStep, usePreviousStep } from "./hooks";

export default function Actions({ disabled }: { disabled?: boolean }) {
  const previousStep = usePreviousStep();
  const nextStep = useNextStep();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: ["1fr", "1fr 1fr"],
        gap: 1,
      }}
    >
      <Button color="inherit" startIcon={<ArrowBack />} onClick={previousStep}>
        Zurück
      </Button>
      <Button
        variant="contained"
        endIcon={<ArrowForward />}
        disabled={disabled}
        onClick={nextStep}
      >
        Weiter
      </Button>
    </Box>
  );
}
