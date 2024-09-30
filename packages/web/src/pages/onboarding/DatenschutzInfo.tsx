import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
} from "@mui/material";
import { useState } from "react";

export default function DatenschutzInfo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Alert severity="info">
        Deine personenbezogenen Daten sind bei uns sicher.{" "}
        <Link onClick={() => setOpen(true)} sx={{ cursor: "pointer" }}>
          Weitere Informationen
        </Link>
      </Alert>
      <DatenschutzInformationen open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function DatenschutzInformationen({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Informationen zum Datenschutz</DialogTitle>
      <DialogContent>
        <DialogContentText gutterBottom>
          Du machst dir Gedanken über den Schutz deiner Daten? Prima! 😊
        </DialogContentText>
        <DialogContentText gutterBottom>
          Um die von uns angebotene Dienstleistung erfüllen zu können, speichern
          wir deine Daten in unserer in Deutschland gehosteten Cloud-Datenbank{" "}
          <Link
            href="https://firebase.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Firebase
          </Link>
          .
        </DialogContentText>
        <DialogContentText gutterBottom>
          Deine Daten werden pseudonymisiert gespeichert, können also nicht auf
          deine Person zurückgeführt werden.
        </DialogContentText>
        <DialogContentText gutterBottom>
          Vertrauen ist gut, Kontrolle ist besser! 😉 Der Quellcode dieser App
          ist komplett open-source auf{" "}
          <Link
            href="https://github.com/rescuetablet/agt-tauglich/"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>{" "}
          verfügbar.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="inherit" onClick={onClose}>
          Schließen
        </Button>
      </DialogActions>
    </Dialog>
  );
}
