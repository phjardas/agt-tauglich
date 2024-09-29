import { Edit, HighlightOff, ThumbUp } from "@mui/icons-material";
import {
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
import { Navigate } from "react-router";
import Global from "../components/Global";
import InputDialog from "../components/InputDialog";
import { type Data, Inputs, useData } from "../data";

export default function Status() {
  const data = useData();

  return data ? (
    <Tauglichkeit data={data} />
  ) : (
    <Navigate to="/onboarding" replace />
  );
}

function Tauglichkeit({ data: { calculated } }: { data: Data }) {
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            color: tauglich ? "success.main" : "error.main",
            gap: 2,
            mb: 4,
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
        <List dense sx={{ py: 0 }}>
          {tauglichkeiten.map((t) => (
            <TauglichkeitListItem key={t.inputField} now={now} {...t} />
          ))}
        </List>
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
  inputField,
  gueltigBis,
  now,
  label,
}: {
  inputField: keyof Inputs;
  gueltigBis?: string;
  now: string;
  label: ReactNode;
}) {
  const tauglich = gueltigBis ? gueltigBis >= now : false;

  return (
    <ListItem
      secondaryAction={<EditInputButton label={label} field={inputField} />}
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
  label,
  field,
}: {
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
          label={label}
          field={field}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
