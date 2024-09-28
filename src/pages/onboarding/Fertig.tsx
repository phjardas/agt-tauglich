import { ArrowForward } from "@mui/icons-material";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ErrorAlert from "../../components/ErrorAlert";
import LinkBehavior from "../../components/LinkBehavior";
import { useSetData } from "../../data";
import { DataState } from "../../types";
import { useOnboarding } from "./hooks";

export default function Fertig() {
  const state = useFinishOnboarding();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {state.state === "loading" && (
        <>
          <Typography variant="h4" component="h1">
            Einen Moment noch…
          </Typography>
          <LinearProgress />
        </>
      )}
      {state.state === "error" && <ErrorAlert error={state.error} />}
      {state.state === "ready" && (
        <>
          <Typography variant="h4" component="h1">
            Fertig!
          </Typography>
          <Typography>Wir haben jetzt alle Informationen zusammen.</Typography>
          <Button
            component={LinkBehavior}
            href="/status"
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
          >
            Los geht's!
          </Button>
        </>
      )}
    </Box>
  );
}

function useFinishOnboarding(): DataState<void> {
  const { onboarding } = useOnboarding();
  const setData = useSetData();
  const [state, setState] = useState<DataState<void>>({ state: "loading" });

  useEffect(() => {
    setData({
      geburtsdatum: onboarding.geburtsdatum!,
      g26: onboarding.g26!,
      unterweisung: onboarding.unterweisung!,
      streckendurchgang: onboarding.streckendurchgang!,
      einsatzUebung: onboarding.einsatzUebung!,
    })
      .then(() => setState({ state: "ready", data: undefined }))
      .catch((error) => setState({ state: "error", error }));
  }, [onboarding, setData]);

  return state;
}
