import { Edit, HighlightOff, ThumbUp } from "@mui/icons-material";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  type SvgIconProps,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
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
          <TauglichkeitListItem
            inputField="g26"
            label="G26.3"
            now={now}
            gueltigBis={calculated.g26GueltigBis}
          />
          <TauglichkeitListItem
            inputField="streckendurchgang"
            label="Streckendurchgang"
            now={now}
            gueltigBis={calculated.streckendurchgangGueltigBis}
          />
          <TauglichkeitListItem
            inputField="unterweisung"
            label="Unterweisung"
            now={now}
            gueltigBis={calculated.unterweisungGueltigBis}
          />
          <TauglichkeitListItem
            inputField="einsatzUebung"
            label="Einsatz oder Übung"
            now={now}
            gueltigBis={calculated.einsatzUebungGueltigBis}
          />
        </List>
      </Global>
    </Box>
  );
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
            <>gültig bis {new Date(gueltigBis).toLocaleDateString()}</>
          ) : (
            "nicht vorhanden"
          )
        }
      />
    </ListItem>
  );
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
