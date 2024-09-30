import { type User } from "@agt-tauglich/model";
import { ArrowForward } from "@mui/icons-material";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useApplication, type DataState } from "../../application";
import ErrorAlert from "../../components/ErrorAlert";
import LinkBehavior from "../../components/LinkBehavior";
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
            href={`/${state.data.id}`}
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

function useFinishOnboarding(): DataState<User> {
  const working = useRef(false);
  const { onboarding } = useOnboarding();
  const application = useApplication();
  const [state, setState] = useState<DataState<User>>({ state: "loading" });

  useEffect(() => {
    if (working.current) return;
    working.current = true;

    application
      .createUser({
        geburtsdatum: onboarding.geburtsdatum!,
        g26: onboarding.g26!,
        unterweisung: onboarding.unterweisung!,
        streckendurchgang: onboarding.streckendurchgang!,
        einsatzUebung: onboarding.einsatzUebung!,
      })
      .then((user) => setState({ state: "ready", data: user }))
      .catch((error) => setState({ state: "error", error }));
  }, [application, onboarding]);

  return state;
}
