import { Edit, HighlightOff, ThumbUp } from "@mui/icons-material";
import {
  Alert,
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  type SvgIconProps,
  Typography,
} from "@mui/material";
import { differenceInDays, differenceInMonths, format } from "date-fns";
import { type ReactNode, useState } from "react";
import { useParams } from "react-router";
import Global from "../components/Global";
import GlobalLoading from "../components/GlobalLoading";
import InputDialog from "../components/InputDialog";
import { type Data, Inputs, useData } from "../data";

export default function Status() {
  const { userId = "" } = useParams<{ userId: string }>();
  const data = useData(userId);

  if (data.state === "loading") {
    return <GlobalLoading />;
  }

  if (data.state === "error") {
    throw data.error;
  }

  if (!data.data) {
    throw new Error("Benutzer:in nicht gefunden.");
  }

  return <Tauglichkeit userId={userId} data={data.data} />;
}

function Tauglichkeit({
  userId,
  data: { inputs, calculated },
}: {
  userId: string;
  data: Data;
}) {
  const now = format(new Date(), "yyyy-MM-dd");
  const tauglich = calculated.tauglichBis
    ? calculated.tauglichBis >= now
    : false;

  const tauglichkeiten = getSortedTauglichkeiten([
    { inputField: "g26", label: "G26.3", gueltigBis: calculated.g26GueltigBis },
    {
      inputField: "streckendurchgang",
      label: "Streckendurchgang",
      gueltigBis: calculated.streckendurchgangGueltigBis,
    },
    {
      inputField: "unterweisung",
      label: "Unterweisung",
      gueltigBis: calculated.unterweisungGueltigBis,
    },
    {
      inputField: "einsatzUebung",
      label: "Einsatz oder Übung",
      gueltigBis: calculated.einsatzUebungGueltigBis,
    },
  ]);

  return (
    <Box
      sx={{
        bgcolor: tauglich ? "success.dark" : "error.dark",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <Global>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              color: tauglich ? "success.main" : "error.main",
              gap: 2,
            }}
          >
            <TauglichkeitIcon
              tauglich={tauglich}
              sx={{ width: "100%", maxWidth: "6rem", height: "auto" }}
            />
            <Typography variant="h4">
              {tauglich ? "Du bist tauglich" : "Du bist nicht tauglich"}
            </Typography>
          </Box>
          <List dense disablePadding>
            {tauglichkeiten.map((t) => (
              <TauglichkeitListItem
                key={t.inputField}
                userId={userId}
                inputs={inputs}
                now={now}
                {...t}
              />
            ))}
          </List>
          <Alert severity="info">
            In Zukunft kommt hier noch eine Funktion, die automatisch
            Benachrichtigungen verschickt, wenn eine Tauglichkeits-Voraussetzung
            abzulaufen droht.
          </Alert>
        </Box>
      </Global>
    </Box>
  );
}

function getSortedTauglichkeiten(
  tauglichkeiten: ReadonlyArray<{
    inputField: keyof Inputs;
    label: ReactNode;
    gueltigBis?: string;
  }>
): ReadonlyArray<{
  inputField: keyof Inputs;
  label: ReactNode;
  gueltigBis?: string;
}> {
  return tauglichkeiten.toSorted((a, b) => {
    if (!a.gueltigBis) return 1;
    if (!b.gueltigBis) return -1;
    return a.gueltigBis.localeCompare(b.gueltigBis);
  });
}

function TauglichkeitIcon({
  tauglich,
  ...props
}: { tauglich: boolean } & SvgIconProps) {
  return tauglich ? <ThumbUp {...props} /> : <HighlightOff {...props} />;
}

function TauglichkeitListItem({
  userId,
  inputs,
  inputField,
  gueltigBis,
  now,
  label,
}: {
  userId: string;
  inputs: Inputs;
  inputField: keyof Inputs;
  gueltigBis?: string;
  now: string;
  label: ReactNode;
}) {
  const tauglich = gueltigBis ? gueltigBis >= now : false;

  return (
    <ListItem
      secondaryAction={
        <EditInputButton
          userId={userId}
          inputs={inputs}
          label={label}
          field={inputField}
        />
      }
    >
      <ListItemIcon>
        <TauglichkeitIcon
          tauglich={tauglich}
          color={tauglich ? "success" : "error"}
        />
      </ListItemIcon>
      <ListItemText
        primary={label}
        secondary={
          gueltigBis ? (
            <>
              <span>
                gültig bis {new Date(gueltigBis).toLocaleDateString()}
              </span>
              {gueltigBis && (
                <TauglichkeitWarnung gueltigBis={gueltigBis} now={now} />
              )}
            </>
          ) : (
            "nicht vorhanden"
          )
        }
        secondaryTypographyProps={{
          component: "div",
          sx: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          },
        }}
      />
    </ListItem>
  );
}

function TauglichkeitWarnung({
  gueltigBis,
  now,
}: {
  gueltigBis: string;
  now: string;
}) {
  if (gueltigBis < now) {
    return (
      <Chip component="span" label="abgelaufen" color="error" size="small" />
    );
  }

  const months = differenceInMonths(gueltigBis, now);
  const days = differenceInDays(gueltigBis, now);

  if (months < 1) {
    return (
      <Chip
        component="span"
        label={`noch ${days} Tag${days > 1 ? "e" : ""}`}
        color="error"
        size="small"
      />
    );
  }

  if (months < 4) {
    return (
      <Chip
        component="span"
        label={`noch ${months} Monat${months > 1 ? "e" : ""}`}
        color="info"
        size="small"
      />
    );
  }

  return <Chip component="span" label={`noch ${months} Monate`} size="small" />;
}

function EditInputButton({
  userId,
  inputs,
  label,
  field,
}: {
  userId: string;
  inputs: Inputs;
  label: ReactNode;
  field: keyof Inputs;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <Edit />
      </IconButton>
      {open && (
        <InputDialog
          userId={userId}
          inputs={inputs}
          label={label}
          field={field}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
